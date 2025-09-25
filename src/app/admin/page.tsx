import { redirect } from "next/navigation";
import Dashboard from "./components/Dashboard";
import { stackServerApp } from "@/stack";

export default async function Admin() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  if (user?.clientReadOnlyMetadata?.role !== "admin") redirect("/");

  return (
    <>
      <Dashboard />
    </>
  );
}
