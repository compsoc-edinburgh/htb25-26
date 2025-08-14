import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="mt-14 flex min-h-[calc(100vh-4rem)] w-full max-w-screen-md flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
