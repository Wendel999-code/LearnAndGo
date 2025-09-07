import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function Sigin() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        fullPage={true}
        extraInfo={
          <>
            Go to <Link href="/">Home</Link>
          </>
        }
      />
    </div>
  );
}
