import { PropsWithChildren } from "react";

export default async function ApplyLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      {children}
    </>
  );
}
