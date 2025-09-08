import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-instance";

const XENDIT_CALLBACK_TOKEN = process.env.XENDIT_CALLBACK_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-callback-token");

    if (!signature || signature !== XENDIT_CALLBACK_TOKEN) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const body = await req.json();


    const reference_id = body.external_id;

    let status: "PENDING" | "PAID" | "FAILED" | "EXPIRED" = "PENDING";

    if (body.status === "PAID") status = "PAID";
    else if (body.status === "FAILED") status = "FAILED";
    else if (body.status === "EXPIRED") status = "EXPIRED";

    await prisma.invoice.updateMany({
      where: { reference_id },
      data: {
        status,
        ammountPaid: body.amount,
        paidAt: status === "PAID" ? new Date() : null,
        payment_channel: body.payment_channel
      },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Error", { status: 400 });
  }
}
