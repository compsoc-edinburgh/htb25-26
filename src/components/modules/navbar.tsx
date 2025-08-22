"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "../ui/drawer";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#schedule", label: "SCHEDULE" },
  { href: "/#team", label: "TEAM" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#volunteer", label: "VOLUNTEER" },
];

const STYLES = {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
  navButton: {
    base: "h-full w-full rounded-md bg-transparent px-5 py-2 font-normal",
    desktop: "text-black hover:bg-white hover:text-black",
    mobile: "text-white hover:bg-white hover:text-black",
  },
  signInButton:
    "relative flex translate-x-4 items-center justify-center rounded-t-lg bg-black px-10 py-4 text-sm font-normal text-white transition hover:bg-amber-400 md:text-base",
} as const;

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const containerClasses = mobile
    ? "flex flex-col items-start gap-2 text-[9px]" // items-start = left-aligned
    : "flex w-full items-center justify-center gap-4 text-black";

  const buttonClasses = mobile
    ? "bg-transparent py-1 px-0 rounded-none text-white hover:bg-white hover:text-black w-auto inline-block"
    : `${STYLES.navButton.base} ${STYLES.navButton.desktop}`;

  return (
    <div className={containerClasses}>
      {NAV_LINKS.map(({ href, label }) => (
        <Button asChild key={href} className={buttonClasses}>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </Link>
        </Button>
      ))}
    </div>
  );
};


const AuthSection = ({ mobile = false }: { mobile?: boolean }) => {
  const containerClasses = mobile
    ? "flex flex-col gap-2"
    : "flex items-center gap-1";

  return (
    <div className={containerClasses}>
      {mobile ? (
        <Link href="/signin" className="text-[9px] text-white hover:text-gray-300">
          SIGN IN
        </Link>
      ) : (
        <Link
          href="/signin"
          className={STYLES.signInButton}
          style={{ clipPath: STYLES.clipPath }}
        >
          SIGN IN
        </Link>
      )}
    </div>
  );
};


const MobileDrawer = () => (
  <div className="flex h-full items-center px-4">
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="-ml-1 block cursor-pointer lg:hidden"
        >
          <Menu className="h-6 w-6 text-black" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[60vh] overflow-y-auto font-tektur rounded-t-2xl border border-border/10 bg-black backdrop-blur-xl">
      <DrawerTitle className="sr-only"></DrawerTitle>
  <div className="grid grid-cols-[100px_1fr] gap-6 p-6 font-hexaframe">
    
    <div className="flex flex-col gap-8">
    <div className="flex items-center gap-2 text-[9px] uppercase text-white">
        <div className="w-1 h-1 bg-white" />
        <span>Pages</span>
      </div>

      <div className="mt-40 flex items-center gap-2 text-[9px] uppercase text-white">
        <div className="w-1 h-1 bg-white" />
        <span>Connect</span>
      </div>

      <div className="mt-7 flex items-center gap-2 text-[9px] uppercase text-white">
        <div className="w-1 h-1 bg-white" />
        <span>Participate</span>
      </div>
    </div>

    <div className="flex flex-col gap-2 space-y-0">
    <div className="flex flex-col gap-1 text-sm items-start [&_a]:py-1 [&_a]:px-0 [&_a]:rounded-none [&_a]:inline-block [&_a]:w-auto [&_a]:text-left -mt-2">
  <NavLinks mobile />
</div>

    <div className="flex flex-col gap-2 text-[9px] mr-1 [&_a]:text-white [&_a]:text-left" style={{ paddingTop: "2rem" }}>
      <a href="#" className="text-white">TWITTER</a>
      <a href="#" className="text-white">DISCORD</a>
      <a href="#" className="text-white">INSTAGRAM</a>
      </div>
      <div className="text-[9px] flex flex-col gap-2" style={{ paddingTop: "0.5rem" }}>
      <a href="#" className="text-white">REGISTER</a>
      <AuthSection mobile />
      <a href="#" className="text-white">VOLUNTEER</a>
      </div>
    </div>

  </div>
</DrawerContent>
    </Drawer>
  </div>
);
export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]">
      <div
        className="col-span-3 h-5 w-full backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="h-full w-5 backdrop-blur-sm" aria-hidden="true" />

      <div className="flex h-full w-full flex-col rounded-lg md:border md:border-gray-200">
        <nav className="pointer-events-auto relative flex h-14 w-full items-center justify-between rounded-t-lg border-b border-gray-200 bg-white md:pl-14">
          <MobileDrawer />

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 px-4 lg:block">
            <NavLinks />
          </div>

          <div className="flex h-full items-center px-4">
            <div className="hidden lg:flex">
              <AuthSection />
            </div>
          </div>
        </nav>

        <div
          className="hidden h-full w-14 border-r border-gray-200 bg-white md:block"
          aria-hidden="true"
        />
        <div
          className="hidden h-14 w-full rounded-b-lg border-t border-gray-200 bg-white md:block"
          aria-hidden="true"
        />
      </div>

      <div className="h-5 w-5 backdrop-blur-sm" aria-hidden="true" />

      <div
        className="col-span-3 h-5 w-full backdrop-blur-sm"
        aria-hidden="true"
      />
    </div>
  );
}
