import { PropsWithChildren } from "react";
import Navbar from "~/components/navbar";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="flex flex-col items-center pt-16 px-4">
      <Navbar />
      {children}
    </main>
  );
}
