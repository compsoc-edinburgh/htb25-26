import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import WebGLBackground from "~/components/gradient-background";
import Navbar from "~/components/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  return (
    <section className="pt-16">
      <WebGLBackground />
      <Navbar isAdmin={user.sessionClaims?.metadata.role === "admin"} />
      {children}
    </section>
  );
}
