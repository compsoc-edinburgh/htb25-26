import { PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </main>
  );
}
