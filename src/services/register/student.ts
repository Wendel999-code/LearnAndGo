"use server";

import prisma from "@/lib/prisma-instance";
import supabase from "@/lib/supabase-storage";

import { v4 as uuid } from "uuid"


type StudentFormData = {
    first_name: string;
    last_name: string;
    age: string;
    email: string;
    phone: string;
    address: string;
    courseTitle: string;
    coursePrice: number;
    valid_id: File | null;
    selfie: File | null;
};

export async function registerStudent(formData: StudentFormData) {
    try {
        // 1. Upload files to Supabase storage
        const timestamp = Date.now();

        const validIdPath = `valid_ids/${timestamp}-${formData.valid_id?.name}`;
        const selfiePath = `selfies/${timestamp}-${formData.selfie?.name}`;

        const { error: validIdError } = await supabase.storage
            .from("learn_and_go") // your bucket name
            .upload(validIdPath, formData.valid_id!, {
                cacheControl: "3600",
                upsert: false,
            });

        if (validIdError) throw validIdError;

        const { error: selfieError } = await supabase.storage
            .from("learn_and_go")
            .upload(selfiePath, formData.selfie!, {
                cacheControl: "3600",
                upsert: false,
            });

        if (selfieError) throw selfieError;

        // 2. Get public URLs
        const {
            data: { publicUrl: validIdUrl },
        } = supabase.storage.from("learn_and_go").getPublicUrl(validIdPath);

        const {
            data: { publicUrl: selfieUrl },
        } = supabase.storage.from("learn_and_go").getPublicUrl(selfiePath);

        // 3. Save student record in Prisma

        const reference_id = uuid()


        const student = await prisma.student.create({
            data: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                age: formData.age,
                email: formData.email,
                phone: formData.phone,
                valid_id_URL: validIdUrl,
                selfie_URL: selfieUrl,
                address: formData.address,

                invoices: {
                    create: {
                        reference_id,
                        courseTitle: formData.courseTitle,
                        coursePrice: formData.coursePrice
                    }
                }

            },
        });

        return { success: true, student };
    } catch (error: any) {
        console.error("Error registering student:", error);
        return { success: false, error: error.message };
    }
}
