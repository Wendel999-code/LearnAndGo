"use server";

import { stackServerApp } from "@/stack";

export async function getUsers() {
  try {
    const res = await fetch("https://api.stack-auth.com/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Stack-Access-Type": "server",
        "X-Stack-Project-Id": process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
        "X-Stack-Secret-Server-Key": process.env.STACK_SECRET_SERVER_KEY!,
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || error.message,
      user: null,
    };
  }
}

export async function currentUser() {
  try {
    const user = await stackServerApp.getUser({ or: "redirect" });

    if (!user) throw new Error("Unauthorized");

    return user.clientReadOnlyMetadata.role;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || error.message,
      user: null,
    };
  }
}
