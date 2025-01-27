import { SignupForm } from "./signup-form";


export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] mt-14 max-w-screen-md w-full flex-col items-center justify-center">
      <SignupForm />
    </div>
  );
}
