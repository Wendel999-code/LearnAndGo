import { auth } from "@clerk/nextjs/server";
import Header from "./components/header";
import SideBar from "./components/side-bar";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata.role !== Role.ADMIN) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex flex-col bg-theme">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
