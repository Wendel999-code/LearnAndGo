"use server";

export async function getUser() {
    try {

        const res = await fetch("https://api.stack-auth.com/api/v1/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Stack-Access-Type": "server",
                "X-Stack-Project-Id": process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
                "X-Stack-Secret-Server-Key": process.env.STACK_SECRET_SERVER_KEY!
            }
        });

        const data = await res.json();

        console.log(data.items)

        return data


    } catch (error: any) {
        console.error(error.response?.data || error.message);
        return { success: false, message: "Cannot get user", user: null };
    }
}
