"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/#faq", label: "FAQs" },
    { href: "/team", label: "Team" },
    { href: "/sponsors", label: "Sponsors" },
    {
      href: "https://2024.hacktheburgh.com",
      label: "HTB 2024",
      external: true,
    },
    { href: "/contact", label: "Contact" },
  ];

  const renderNavLinks = (mobile = false) =>
    navLinks.map(({ href, label, external }, index) => (
      <motion.div
        key={href}
        initial={mobile ? { opacity: 0, x: -20 } : {}}
        animate={mobile ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: mobile ? index * 0.1 : 0, bounce: 0 }}
      >
        <Button
          asChild
          className="h-full w-full rounded-md bg-black/70 px-8 py-3 font-semibold text-foreground hover:bg-black/90"
        >
          <Link
            href={href}
            {...(external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {label}
          </Link>
        </Button>
      </motion.div>
    ));

  const renderAuthSection = (mobile = false) => {
    if (!isLoaded) return <span className="text-gray-400">Loading...</span>;

    if (isSignedIn) {
      return (
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={
            mobile
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {}
          }
          transition={{ delay: mobile ? navLinks.length * 0.1 : 0, bounce: 0 }}
        >
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/dashboard/application"
              className={mobile ? "text-white" : ""}
            >
              My Application
            </Link>
            {isAdmin && (
              <Link
                href="/dashboard/admin"
                className={mobile ? "text-white" : ""}
              >
                Admin Dashboard
              </Link>
            )}
            <div className={mobile ? "pt-2" : ""}>
              <UserButton />
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={mobile ? { opacity: 0, x: -20 } : {}}
        animate={mobile ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: mobile ? navLinks.length * 0.1 : 0, bounce: 0 }}
        className={mobile ? "flex flex-col gap-2" : "flex items-center gap-1"}
      >
        <Button
          asChild
          className={`h-full rounded-md bg-accent-yellow px-8 py-3 text-black hover:bg-accent-yellow/90 ${
            mobile ? "w-full" : ""
          }`}
        >
          <Link href="/signup">Register</Link>
        </Button>
        <Button
          asChild
          className="h-full rounded-md bg-black/70 px-8 py-3 font-semibold text-foreground hover:bg-black/90"
        >
          <Link href="/signin">Sign In</Link>
        </Button>
      </motion.div>
    );
  };

  return (
    <nav className="relative w-full px-4 py-3">
      <div className="flex items-center justify-between rounded-2xl border border-border/10 bg-black/20 p-2 font-tektur font-medium text-white shadow backdrop-blur-2xl">
        <div className="flex items-center gap-4 pl-4 md:gap-8">
          <Link href="/" aria-label="Home">
            <img
              src="/HB-icon-neon-small.png"
              alt="HackBurgh Logo"
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {renderNavLinks()}
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {renderAuthSection()}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.div>
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                bounce: 0,
              }}
              className="fixed left-4 right-4 top-[4.5rem] z-50 rounded-2xl border border-border/10 bg-black/20 p-4 font-tektur backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                {renderNavLinks(true)}
                {renderAuthSection(true)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
