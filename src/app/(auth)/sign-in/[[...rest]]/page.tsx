import { SignIn } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: shadcn,
          variables: {
            colorPrimary: "#facc15",
          },
          elements: {
            button:
              "bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg",
          },
        }}
      />
    </div>
  );
}
