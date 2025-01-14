import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import Navbar from "~/components/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  return (
    <>
      <Navbar isAdmin={user.sessionClaims?.metadata.role === "admin"} />
      {children}
    </>
  );
}
