"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Loader2, Menu } from "lucide-react";
import { useState, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "../ui/drawer";
import { useUser } from "@clerk/nextjs";

// register gsap plugins once on client
if (
  typeof window !== "undefined" &&
  (gsap as any) &&
  !(gsap as any)._htbPlugins
) {
  gsap.registerPlugin(ScrollToPlugin, ScrambleTextPlugin);
  (gsap as any)._htbPlugins = true;
}

import { NAV_LINKS, SOCIAL_LINKS } from "~/lib/constants/navigation";
import { COPYRIGHT_TEXT } from "~/lib/constants/site";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";

const STYLES = {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
  navButton: {
    base: "bg-transparent font-normal",
    desktop: "text-black text-xs",
    mobile: "text-white font-whyte",
  },
  signInButton:
    "relative flex translate-x-4 items-center justify-center rounded-t-lg bg-black px-10 py-4 text-sm font-normal text-white transition md:text-base",
} as const;

const NavLinks = ({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const containerClasses = mobile
    ? "flex flex-col items-start gap-2 text-[9px]"
    : "flex w-full items-center justify-center gap-14 text-black";

  const buttonClasses = mobile
    ? "py-1 px-0 text-2xl rounded-none text-white w-auto inline-block font-bold"
    : `${STYLES.navButton.base} ${STYLES.navButton.desktop}`;

  // smooth scroll handler using gsap ScrollTo with offset for navbar
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;

    if (pathname !== "/") {
      router.push("/");
      return;
    }

    // play click animation on mobile
    if (mobile) {
      const anchor = e.currentTarget;
      const bg = anchor.querySelector(".navlink-bg") as HTMLElement | null;
      const text = anchor.querySelector(".navlink-text") as HTMLElement | null;
      if (bg) {
        gsap.killTweensOf(bg);
        gsap.set(bg, { zIndex: 0, transformOrigin: "left center", scaleX: 0 });
        gsap.to(bg, { scaleX: 1, duration: 0.25, ease: "power2.out" });
      }
      if (text) {
        if (!text.dataset.originalLabel)
          text.dataset.originalLabel = text.textContent || "";
        gsap.killTweensOf(text);
        gsap.set(text, { position: "relative", zIndex: 1 });
        gsap.to(text, { color: "#000", duration: 0.2, ease: "power2.out" });
        gsap.to(text, {
          duration: 0.5,
          scrambleText: {
            text: text.dataset.originalLabel || "",
            chars: "upperCase",
            revealDelay: 0,
            speed: 0.6,
          },
        });
      }
    }

    const id = href.replace("/#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 88; // approximate navbar height

    const doScroll = () =>
      gsap.to(window, {
        duration: 0.6,
        ease: "power2.out",
        scrollTo: { y: el, offsetY: offset },
      });

    if (mobile && onNavigate) {
      // close the drawer first so content becomes scrollable and visible
      onNavigate();
      // give the drawer a brief moment to start closing before scrolling
      setTimeout(doScroll, 220);
    } else {
      doScroll();
    }
  };

  return (
    <div className={containerClasses}>
      {NAV_LINKS.map(({ href, label }) => (
        <Button
          asChild
          key={href}
          className={buttonClasses + " hover:none px-0 py-0"}
          variant="ghost"
        >
          <a
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="relative inline-block"
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              const bg = el.querySelector(".navlink-bg") as HTMLElement;
              const text = el.querySelector(".navlink-text") as HTMLElement;
              if (bg) {
                gsap.killTweensOf(bg);
                gsap.set(bg, { zIndex: 0 });
                gsap.fromTo(
                  bg,
                  { scaleX: 0, transformOrigin: "left center" },
                  { scaleX: 1, duration: 0.25, ease: "power2.out" }
                );
              }
              if (text) {
                // Store original label if not already stored
                if (!text.dataset.originalLabel) {
                  text.dataset.originalLabel = label;
                }
                gsap.killTweensOf(text);
                gsap.set(text, { position: "relative", zIndex: 1 });
                gsap.to(text, {
                  color: mobile ? "#000" : "#fff",
                  duration: 0.2,
                  ease: "power2.out",
                });
                gsap.to(text, {
                  duration: 0.5,
                  scrambleText: {
                    text: label,
                    chars: "upperCase",
                    revealDelay: 0,
                    speed: 0.6,
                  },
                });
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              const bg = el.querySelector(".navlink-bg") as HTMLElement;
              const text = el.querySelector(".navlink-text") as HTMLElement;
              if (bg) {
                gsap.killTweensOf(bg);
                gsap.to(bg, {
                  scaleX: 0,
                  transformOrigin: "right center",
                  duration: 0.25,
                  ease: "power2.in",
                });
              }
              if (text) {
                gsap.killTweensOf(text);
                // Restore original text content to avoid partial scramble
                if (text.dataset.originalLabel) {
                  text.textContent = text.dataset.originalLabel;
                }
                gsap.to(text, {
                  color: mobile ? "#fff" : "#000",
                  duration: 0.2,
                  ease: "power2.out",
                });
              }
            }}
          >
            <span
              className={
                "navlink-bg pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 " +
                (mobile ? "bg-white" : "bg-black")
              }
            />
            <span className="navlink-text relative z-[1]">{label}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};
const ActionButton = ({ mobile = false }: { mobile?: boolean }) => {
  const { isSignedIn } = useUser();
  const application = api.application.getUserApplication.useQuery();

  // Define a simple rectangle clip path for the overlay
  const rectClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

  // Scramble handlers (match NavLinks behavior, no bg expansion)
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const text = (e.currentTarget as HTMLElement).querySelector(
      ".authlink-text"
    ) as HTMLElement | null;
    if (!text) return;
    // Skip if loader is shown
    if (text.querySelector("svg")) return;

    if (!text.dataset.originalLabel) {
      text.dataset.originalLabel = text.textContent || "";
    }
    gsap.killTweensOf(text);
    gsap.to(text, {
      duration: 0.5,
      scrambleText: {
        text: text.dataset.originalLabel || "",
        chars: "upperCase",
        revealDelay: 0,
        speed: 0.6,
      },
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const text = (e.currentTarget as HTMLElement).querySelector(
      ".authlink-text"
    ) as HTMLElement | null;
    if (!text) return;
    gsap.killTweensOf(text);
    if (text.dataset.originalLabel) {
      text.textContent = text.dataset.originalLabel;
    }
  };

  // TODO: Change this to DASHBOARD when the dashboard is ready
  const buttonText =
    isSignedIn && application.data
      ? "APPLICATION STATUS"
      : "APPLICATIONS CLOSED";
  const href =
    isSignedIn && application.data ? "/status" : "/applications-closed";

  // Mobile version - simple text link
  if (mobile) {
    return (
      <Link
        href={href}
        className="text-[11px] tracking-wide text-white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="authlink-text">
          {isSignedIn === undefined || application.isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            buttonText
          )}
        </span>
      </Link>
    );
  }

  // Desktop version - styled button
  return (
    <div className="flex items-center justify-end">
      <Link href={href}>
        <div
          className={`${STYLES.signInButton} h-14 w-48 bg-white transition-colors duration-200 hover:bg-zinc-900 md:w-56`}
          style={{ clipPath: STYLES.clipPath }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute inset-0 rounded-t-sm bg-zinc-900 transition-colors duration-200"
            style={{ clipPath: rectClipPath }}
          />
          <span className="authlink-text relative z-10 flex items-center justify-center text-xs">
            {isSignedIn === undefined || application.isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              buttonText
            )}
          </span>
        </div>
      </Link>
    </div>
  );
};

const MobileDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <div className="flex h-full items-center px-4">
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="-ml-1 block cursor-pointer lg:hidden"
        >
          <Menu className="h-6 w-6 text-black" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-fit border border-border/10 bg-black backdrop-blur-xl">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <div className="z-1 absolute -top-1 h-10 w-full bg-black"></div>

        <div className="z-10 -mt-5 flex flex-col divide-y divide-zinc-800">
          <section className="flex items-start px-6 pb-3 pt-9">
            <div className="shrink-0 basis-1/3 pr-4">
              <div className="flex items-center gap-2 pt-2 text-[9px] uppercase text-white">
                <span className="h-1 w-1 bg-white" />
                <span>Pages</span>
              </div>
            </div>
            <div className="basis-2/3">
              <div className="flex flex-col items-start gap-1 font-whyte text-sm [&_a]:inline-block [&_a]:rounded-none [&_a]:px-0 [&_a]:py-1 [&_a]:text-left">
                <NavLinks mobile onNavigate={() => onOpenChange(false)} />
              </div>
            </div>
          </section>

          <section className="flex items-start px-6 py-8">
            <div className="shrink-0 basis-1/3 pr-4">
              <div className="flex items-center gap-2 text-[9px] uppercase text-white">
                <span className="h-1 w-1 bg-white" />
                <span>Connect</span>
              </div>
            </div>
            <div className="basis-2/3">
              <ul className="-mt-0.5 flex flex-col gap-2 text-[11px] uppercase tracking-wide">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="flex items-start px-6 py-8">
            <div className="shrink-0 basis-1/3 pr-4">
              <div className="flex items-center gap-2 text-[9px] uppercase text-white">
                <span className="h-1 w-1 bg-white" />
                <span>Participate</span>
              </div>
            </div>
            <div className="-mt-0.5 basis-2/3">
              <div className="flex flex-col gap-1 text-[11px] tracking-wide">
                <ActionButton mobile />
                <a
                  href="/volunteer"
                  className="text-white"
                  onClick={() => onOpenChange(false)}
                >
                  VOLUNTEER
                </a>
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center py-8 text-xs uppercase">
            <div className="text-[10px] text-neutral-600">
              MADE WITH &lt;3 BY:{" "}
              <a href="https://danyilbutov.com/" className="underline">
                Danyil
              </a>
              ,{" "}
              <a href="https://itskay.co" className="underline">
                KAY
              </a>{" "}
              ,{" "}
              <a href="https://emilymiller.xyz" className="underline">
                Emily
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/yuna-shono-1b3431188?"
                className="underline"
              >
                Yuna
              </a>
              , Abibabis
            </div>
            <div className="mt-2 text-[10px] text-neutral-600">
              {COPYRIGHT_TEXT}
            </div>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  </div>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <MobileDrawer open={mobileOpen} onOpenChange={setMobileOpen} />

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 px-4 lg:block">
            <NavLinks />
          </div>

          <div className="flex h-full items-center px-4">
            <div className="hidden lg:flex">
              <ActionButton />
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
