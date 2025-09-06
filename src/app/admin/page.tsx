"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";

export default function MyProtectedClientComponent() {
  const user = useUser({ or: "redirect" });

  if (user?.clientReadOnlyMetadata?.role !== "admin") redirect("/");

  const logout = async () => {
    await user?.signOut();
    redirect("/");
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center gap-4">
      <h1>You can only see this if you are admin in</h1>;
      <button
        onClick={logout}
        className="p-2 cursor-pointer bg-yellow-500 text-white"
      >
        Logout
      </button>
      <ModeToggle />
    </div>
  );
}
