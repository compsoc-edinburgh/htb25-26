"use client";

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

const STYLES = {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
  navButton: {
    base: "h-full w-full rounded-md bg-transparent px-5 py-2 font-normal",
    desktop: "text-black hover:bg-white hover:text-black",
    mobile: "text-white hover:bg-white hover:text-black",
  },
  signInButton:
    "relative flex translate-x-4 items-center justify-center rounded-t-lg bg-black px-10 py-4 text-sm font-normal text-white transition md:text-base",
} as const;

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const containerClasses = mobile
    ? "flex flex-col items-start gap-2 text-[9px]" // items-start = left-aligned
    : "flex w-full items-center justify-center gap-4 text-black";

  const buttonClasses = mobile
    ? "bg-transparent py-1 px-0 text-xl rounded-none text-white hover:bg-white hover:text-black w-auto inline-block"
    : `${STYLES.navButton.base} ${STYLES.navButton.desktop}`;

  return (
    <div className={containerClasses}>
      {NAV_LINKS.map(({ href, label }) => (
        <Button asChild key={href} className={buttonClasses}>
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </div>
  );
};

const AuthSection = ({ mobile = false }: { mobile?: boolean }) => {
  const containerClasses = mobile
    ? "flex flex-col gap-2 text-zinc-400"
    : "flex items-center gap-1 text-white";

  // Define a simple rectangle clip path for the overlay
  const rectClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

  return (
    <div className={containerClasses}>
      {mobile ? (
        <Link href="/signin" className="text-[9px] hover:text-zinc-300">
          SIGN IN
        </Link>
      ) : (
        <Link href="/signin" className="inline-block">
          <motion.div
            className={`${STYLES.signInButton} border border-white bg-black`}
            style={{ clipPath: STYLES.clipPath }}
            whileHover="hover"
          >
           <motion.div
              className="absolute inset-0 bg-white"
              // Use the simple rectangle clip path here
              style={{ clipPath: rectClipPath }}
              initial={{ x: "100%" }}
              variants={{ hover: { x: "0%" } }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
             <motion.span
              className="relative z-10"
              initial={{ color: "#ffffff" }}
              variants={{ hover: { color: "#000000" } }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              SIGN IN
            </motion.span>
          </motion.div>
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

      <DrawerContent className="font-tektur h-[75vh] rounded-t-2xl border border-border/10 bg-black backdrop-blur-xl">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>

        <div className="flex flex-col divide-y divide-zinc-800 p-6 font-hexaframe">
          <section className="flex items-start py-8">
            <div className="shrink-0 basis-1/3 pr-4">
              <div className="flex items-center gap-2 pt-2 text-[9px] uppercase text-white">
                <span className="h-1 w-1 bg-white" />
                <span>Pages</span>
              </div>
            </div>
            <div className="basis-2/3">
              <div className="flex flex-col items-start gap-1 text-sm [&_a]:inline-block [&_a]:rounded-none [&_a]:px-0 [&_a]:py-1 [&_a]:text-left">
                <NavLinks mobile />
              </div>
            </div>
          </section>

          <section className="flex items-start py-8">
            <div className="shrink-0 basis-1/3 pr-4">
              <div className="flex items-center gap-2 text-[9px] uppercase text-white">
                <span className="h-1 w-1 bg-white" />
                <span>Connect</span>
              </div>
            </div>
            <div className="basis-2/3">
              <ul className="flex flex-col gap-2 text-[11px] tracking-wide">
                <li>
                  <a
                    href="https://x.com/hackthevalley"
                    className="text-neutral-400"
                  >
                    TWITTER
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/invite/hackthevalley"
                    className="text-neutral-400"
                  >
                    DISCORD
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/hackthevalley/"
                    className="text-neutral-400"
                  >
                    INSTAGRAM
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="flex items-start py-8">
            <div className="shrink-0 basis-1/3 pr-4">
              <div className="flex items-center gap-2 text-[9px] uppercase text-white">
                <span className="h-1 w-1 bg-white" />
                <span>Participate</span>
              </div>
            </div>
            <div className="basis-2/3">
              <div className="flex flex-col gap-2 text-[11px] tracking-wide">
                <a href="/apply" className="text-neutral-400">
                  REGISTER
                </a>
                <AuthSection mobile />
                <a href="/volunteer" className="text-neutral-400">
                  VOLUNTEER
                </a>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center py-8 text-xs">
            <div className="text-[10px] text-neutral-600">
              MADE WITH &lt;3 BY: DANYIL, KAY, EMILY, YUNA, ABIBABIS
            </div>
            <div className="mt-2 text-[10px] text-neutral-600">
              ©CompSoc HTB Team
            </div>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  </div>
);

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 block grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] md:grid">
      <div
        className="col-span-3 hidden h-5 w-full backdrop-blur-sm md:block"
        aria-hidden="true"
      />
      <div
        className="hidden h-full w-5 backdrop-blur-sm md:block"
        aria-hidden="true"
      />

      <div className="flex h-full w-full flex-col rounded-lg md:border md:border-gray-200">
        <nav className="pointer-events-auto relative flex h-14 w-full items-center justify-between rounded-t-lg border-b border-gray-200 bg-white px-2 md:px-0 md:pl-14">
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

      <div
        className="hidden h-5 w-5 backdrop-blur-sm md:block"
        aria-hidden="true"
      />

      <div
        className="col-span-3 hidden h-5 w-full backdrop-blur-sm md:block"
        aria-hidden="true"
      />
    </div>
  );
}
