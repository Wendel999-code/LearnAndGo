import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="flex items-center flex-col gap-12 justify-center min-h-screen ">
      <h1 className="md:text-3xl font-bold text-gray-700">
        🚧Student Page Under Development 🚧
      </h1>
      <Link href={"/"}>
        {" "}
        <Button className="cursor-pointer">Back to home</Button>
      </Link>
    </div>
  );
}

export default Page;
