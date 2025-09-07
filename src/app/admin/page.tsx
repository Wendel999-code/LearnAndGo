"use client";

import { useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";
import Dashboard from "./components/Dashboard";

export default function MyProtectedClientComponent() {
  const user = useUser({ or: "redirect" });

  if (user?.clientReadOnlyMetadata?.role !== "admin") redirect("/");

  // const fetchUser = async () => {
  //   try {
  //     const res = await getUser();

  //     console.log(res.items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Dashboard />
    </>
  );
}
