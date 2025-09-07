
import { stackServerApp } from "@/stack";
import prisma from "@/lib/prisma-instance";

export async function syncUser() {
    try {
        const user = await stackServerApp.getUser();
        if (!user) return null;

        if (!user?.clientReadOnlyMetadata?.role) {
            await user.update({
                clientReadOnlyMetadata: {
                    role: "student",
                },
            });
        }

        const existing = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (existing) return null

        await prisma.user.create({
            data: {
                id: user.id,
                email: user.primaryEmail ?? null,

            },
        });

        return
    } catch (error) {
        console.error("error in syncUser", error);
        throw error;
    }
}
