import { SignIn } from "@stackframe/stack";

export default function Sigin() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        fullPage={true}
      
        extraInfo={
          <>
            Go to <a href="/">Home</a>
          </>
        }
      />
    </div>
  );
}
