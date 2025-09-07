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
    <div className="w-full">
      <div
        className={
          // Symmetric horizontal padding + centered container.
          // On very large screens, cap width and keep centered.
          `mx-auto w-full px-3 py-10 sm:px-24 md:py-24 2xl:min-w-[1200px] 2xl:max-w-[1400px] ${className}`
        }
      >
        {children}
      </div>
    </div>
  );
}
