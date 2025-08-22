import NavbarLayout from "~/components/modules/navbar-layout";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <NavbarLayout className="flex items-center justify-center">
      <LoginForm />
    </NavbarLayout>
  );
}
