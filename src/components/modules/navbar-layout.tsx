import { ReactNode } from "react";

interface NavbarLayoutProps {
  children: ReactNode;
  className?: string;
}
export default function NavbarLayout({
  children,
  className = "",
}: NavbarLayoutProps) {
  return (
    <div className={`h-full w-full p-5 md:p-24 ${className} `}>{children}</div>
  );
}
