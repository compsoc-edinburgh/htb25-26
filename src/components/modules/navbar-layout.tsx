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
    <div className={`w-full px-5 py-10 md:px-24 md:py-24 ${className} `}>
      {children}
    </div>
  );
}
