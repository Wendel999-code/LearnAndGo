"use server";

import prisma from "@/lib/prisma-instance";
import supabase from "@/lib/supabase-storage";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { StudentFormData, StudentSchema } from "../zod/student";


export async function registerStudentAndPayment(formData: StudentFormData) {
    try {
        // ✅ Validate inputs
        const parsed = StudentSchema.parse(formData);

        if (!parsed.valid_id || !parsed.selfie) {
            throw new Error("Valid ID and selfie are required");
        }


        const timestamp = Date.now();
        const validIdPath = `valid_ids/${timestamp}-${parsed.valid_id.name}`;
        const selfiePath = `selfies/${timestamp}-${parsed.selfie.name}`;

        // ✅ Upload both files in parallel
        const [validIdResult, selfieResult] = await Promise.all([
            supabase.storage.from("learn_and_go").upload(validIdPath, parsed.valid_id, {
                cacheControl: "3600",
                upsert: false,
            }),
            supabase.storage.from("learn_and_go").upload(selfiePath, parsed.selfie, {
                cacheControl: "3600",
                upsert: false,
            }),
        ]);

        if (validIdResult.error) throw validIdResult.error;
        if (selfieResult.error) throw selfieResult.error;

        // ✅ Fetch public URLs in parallel
        const [validIdData, selfieData] = await Promise.all([
            supabase.storage.from("learn_and_go").getPublicUrl(validIdPath).data,
            supabase.storage.from("learn_and_go").getPublicUrl(selfiePath).data,
        ]);

        const reference_id = uuid();

        // ✅ Save to DB (must be sequential, depends on URLs)
        const student = await prisma.student.create({
            data: {
                first_name: parsed.first_name,
                last_name: parsed.last_name,
                age: parsed.age,
                email: parsed.email,
                phone: parsed.phone,
                valid_id_URL: validIdData.publicUrl,
                selfie_URL: selfieData.publicUrl,
                address: parsed.address,
                invoices: {
                    create: {
                        reference_id,
                        courseTitle: parsed.courseTitle,
                        coursePrice: parsed.coursePrice,
                    },
                },
            },
            include: { invoices: true },
        });

        // ✅ Create invoice in Xendit
        const payload = {
            external_id: reference_id,
            amount: 500,
            description: parsed.courseTitle,
            invoice_duration: 43200,
            customer: {
                given_names: parsed.first_name + " " + parsed.last_name,
                surname: parsed.last_name,
                email: parsed.email,
                mobile_number: parsed.phone,
                address: parsed.address,
            },
            success_redirect_url: "https://fef8c0151a1d.ngrok-free.app",
            currency: "PHP",
            items: [
                {
                    name: parsed.courseTitle,
                    quantity: 1,
                    price: parsed.coursePrice,
                    category: "Driving Course",
                    url: "https://2dbe44fe9e05.ngrok-free.app/#courses",
                },
            ],
            metadata: { student_id: student.id },
            should_send_email: true
        };

        const response = await axios.post(
            "https://api.xendit.co/v2/invoices",
            payload,
            {
                auth: {
                    username: process.env.XENDIT_SECRET_KEY!,
                    password: "",
                },
                headers: {
                    "Content-Type": "application/json",
                    "X-Version": "2023-05-01",
                    "X-IDEMPOTENCY-KEY": reference_id,
                },
            }
        );

        return response.data
    } catch (error: any) {
        console.error("Error in registerStudentAndPayment:", error);
        return { success: false, message: error.message };
    }
}


