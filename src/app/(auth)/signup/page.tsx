import { SignIn } from "@clerk/nextjs";
import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "./signup-form";


export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] max-w-screen-md w-full flex-col items-center justify-center">
      <SignupForm />
    </div>
  );
}
