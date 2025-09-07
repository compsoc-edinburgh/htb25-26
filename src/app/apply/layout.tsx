import { type PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className={`w-full py-12 md:py-16 md:pl-[4.2rem] md:pr-[1.25rem]`}>
        {children}
      </div>
    </main>
  );
}
