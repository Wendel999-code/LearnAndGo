import { auth } from "@clerk/nextjs/server";
import Header from "./components/Header";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata.role !== Role.STUDENT) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex flex-col bg-theme">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex flex-1">
        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}
