import { auth } from "@clerk/nextjs/server";
import { type PropsWithChildren } from "react";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { api } from "~/trpc/server";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();
  const application = await api.application.getUserApplication();

  return (
    <section className="">
      {/*<Navbar*/}
      {/*  isAdmin={user.sessionClaims?.metadata.role === "admin"}*/}
      {/*  application={application}*/}
      {/*/>*/}
      {children}
      {/*<div className="mx-auto mb-4 mt-16 max-w-screen-xl px-4">*/}
      {/*  <Footer />*/}
      {/*</div>*/}
    </section>
  );
}
