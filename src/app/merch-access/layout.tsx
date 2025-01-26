import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import WebGLBackground from "~/components/gradient-background";

export default async function MerchAccessLayout({
  children,
}: Readonly<PropsWithChildren>) {

  return (
    <section>
      <WebGLBackground />
      {children}
    </section>
  );
}
