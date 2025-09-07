import { SignUp } from "@stackframe/stack";

export default function Page() {
  return (
    <div>
      <SignUp
        fullPage={true}
        extraInfo={<>By signing up, you agree to our Terms</>}
      />
    </div>
  );
}
