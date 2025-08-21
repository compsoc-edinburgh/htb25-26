"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

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

const ANIMATIONS = {
  mobile: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { bounce: 0 },
  },
} as const;

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
    ? "flex flex-col items-center justify-center gap-4 text-black"
    : "flex w-full items-center justify-center gap-4 text-black";

  const buttonClasses = `${STYLES.navButton.base} ${
    mobile ? STYLES.navButton.mobile : STYLES.navButton.desktop
  }`;

  return (
    <div className={containerClasses}>
      {NAV_LINKS.map(({ href, label }, index) => (
        <motion.div
          key={href}
          {...(mobile
            ? {
                ...ANIMATIONS.mobile,
                transition: {
                  ...ANIMATIONS.mobile.transition,
                  delay: index * 0.1,
                },
              }
            : {})}
        >
          <Button asChild className={buttonClasses}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </Link>
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

const AuthSection = ({ mobile = false }: { mobile?: boolean }) => {
  // const { isSignedIn, isLoaded } = useUser();

  // if (!isLoaded) {
  //   return <span className="pr-4 text-gray-400">Loading...</span>;
  // }

  const containerClasses = mobile
    ? "flex flex-col gap-2"
    : "flex items-center gap-1";

  const animationDelay = mobile ? NAV_LINKS.length * 0.1 + 0.1 : 0;

  return (
    <div className={containerClasses}>
      <motion.div
        {...(mobile
          ? {
              ...ANIMATIONS.mobile,
              transition: {
                ...ANIMATIONS.mobile.transition,
                delay: animationDelay,
              },
            }
          : {})}
      >
        <Link
          href="/signin"
          className={STYLES.signInButton}
          style={{ clipPath: STYLES.clipPath }}
        >
          SIGN IN
        </Link>
      </motion.div>
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
      <DrawerContent className="font-tektur rounded-t-2xl border border-border/10 bg-black backdrop-blur-xl">
        <div className="flex flex-col gap-6 p-6 font-hexaframe">
          <DrawerTitle />
          <NavLinks mobile />
          <AuthSection mobile />
        </div>
      </DrawerContent>
    </Drawer>
  </div>
);
export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 md:p-5">
      <div className="flex h-full w-full flex-col rounded-lg md:border md:border-gray-200">
        <nav className="pointer-events-auto relative flex h-14 w-full items-center justify-between rounded-t-lg border-b border-gray-200 bg-white/80 backdrop-blur-md md:pl-14">
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
          className="hidden h-full w-14 border-r border-gray-200 bg-white/80 backdrop-blur-md md:block"
          aria-hidden="true"
        />
        <div
          className="hidden h-14 w-full rounded-b-lg border-t border-gray-200 bg-white/80 backdrop-blur-md md:block"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
