import { NextResponse } from "next/server";
export async function GET() {
    const response = await fetch("https://api.stack-auth.com/api/v1/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Stack-Access-Type": "server",
            "X-Stack-Project-Id": process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
            "X-Stack-Secret-Server-Key": process.env.STACK_SECRET_SERVER_KEY!
        }
    });

    const data = await response.json();
    console.log(data);


    return NextResponse.json(data);
}
