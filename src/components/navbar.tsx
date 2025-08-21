"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X, Loader} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Application } from "@prisma/client";
import Image from "next/image";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer"; // adjust path if needed


export default function Navbar({
  isAdmin = false,
  application,
}: {
  isAdmin?: boolean;
  application?: Application | null;
}) {
  const { isSignedIn, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";

    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@hacktheburgh.com");
    toast.success("Email copied to clipboard");
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      const navHeight = 80; //estimate
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (isMenuOpen) {
        toggleMenu();
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const navLinks = [
    {
      href: "/#about",
      label: "ABOUT",
    },
    {
      href: "/#schedule",
      label: "SCHEDULE",
    },
    {
      href: "/#team",
      label: "TEAM",
    },
    {
      href: "/#faq",
      label: "FAQ",
    },
    {
      href: "/#volunteer",
      label: "VOLUNTEER",
    },
    // {
    //   href: "https://2024.hacktheburgh.com",
    //   label: "HTB 2024",
    //   external: true,
    // },
    // {
    //   href: "mailto:hello@hacktheburgh.com",
    //   label: "Contact",
    //   external: true,
    // },
  ];
  
  const renderNavLinks = (mobile = false) => (
    <div className={mobile ? "flex flex-col gap-4 items-center text-black justify-center": "flex w-full items-center text-black justify-center gap-4"}>
      {navLinks.map(({ href, label }, index) => ( // removed external from here because not going to external sites
        <motion.div
          key={href}
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: mobile ? index * 0.1 : 0, bounce: 0 }}
        >
          <Button
             asChild
             className={`h-full w-full rounded-md bg-transparent px-5 py-2 font-normal ${mobile ? "text-white hover:bg-white hover:text-black" : "text-black hover:bg-white hover:text-black"}`}
          >
            <Link
              href={href}
              {...({ // removed external from here because not going to external sites
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {label}
            </Link>
          </Button>
        </motion.div>
      ))}
    </div>
  );

  const renderAuthSection = (mobile = false) => {
    if (!isLoaded)
      return <span className="pr-4 text-gray-400">Loading...</span>;

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
          <div className="flex flex-col items-center justify-center gap-4 pr-4 lg:flex-row">
            {application ? (
              <Button
                asChild
                className={`h-full rounded-md bg-accent-yellow px-5 py-2 text-black hover:bg-accent-yellow/90 ${
                  mobile ? "w-full" : ""
                }`}
              >
                <Link href="/dashboard" className={""}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              // <Button
              //   asChild
              //   className={`h-full rounded-md bg-accent-yellow px-5 py-2 text-black hover:bg-accent-yellow/90 ${
              //     mobile ? "w-full" : ""
              //   }`}
              // >
              //   <Link href="/apply" className={mobile ? "text-white" : ""}>
              //     Apply
              //   </Link>
              // </Button>
              <></>
            )}
            {isAdmin && (
              <Button
                asChild
                className="h-full w-full rounded-md bg-transparent px-5 py-2 font-semibold text-foreground hover:bg-black/90"
              >
                <Link
                  href="/dashboard/admin"
                  className={mobile ? "text-white" : ""}
                >
                  Admin
                </Link>
              </Button>
            )}
            <div className={"flex items-center " + mobile ? "pt-2" : ""}>
              <UserButton />
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div
        className={mobile ? "flex flex-col gap-2" : "flex items-center gap-1"}
      >
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: mobile ? navLinks.length * 0.1 : 0, bounce: 0 }}
        >
          {/* <Button
            asChild
            className={`h-full rounded-md bg-accent-yellow px-5 py-2 text-black hover:bg-accent-yellow/90 ${
              mobile ? "w-full" : ""
            }`}
          >
            <Link href="/signup">Register</Link>
          </Button> */}
        </motion.div>
        <motion.div
          initial={mobile ? { opacity: 0, x: -20 } : {}}
          animate={mobile ? { opacity: 1, x: 0 } : {}}
          transition={{
            delay: mobile ? navLinks.length * 0.1 + 0.1 : 0,
            bounce: 0,
          }}
        >
      <Link
        href="/signin"
        className="relative bg-black px-10 py-4 text-white font-normal text-sm md:text-base 
             hover:bg-blue-700 transition flex items-center justify-center rounded-t-lg translate-x-4"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
          }}
      >
        SIGN IN
      </Link>
        </motion.div>
      </div>
    );
  };

  return (
    <>
    {/* bottom bar */}
<footer className="hidden lg:grid fixed bottom-3 left-5 z-50 h-14 w-[calc(100vw-2.5rem)] grid-cols-[1fr_auto_1fr] items-center rounded-bl-lg rounded-br-lg border border-gray-200 border-border/10 font-tektur font-medium text-white"></footer>

{/* left sidebar */}
<aside className="hidden lg:flex fixed left-5 top-3 z-40 h-[calc(100vh-1.5rem)] w-14 items-center justify-between rounded-bl-lg rounded-tl-lg border border-gray-200 border-border/10 border-t-0 font-tektur font-medium text-white" />

{/* right divider */}
<div className="hidden lg:block fixed right-5 top-4 z-40 h-[calc(100vh-1.5rem)] w-[1px] bg-gray-200 border-t-0 border-b-0" />


<nav className="fixed lg:top-3 top-0
                left-0 w-full 
                lg:left-5 lg:w-[calc(100vw-2.5rem)] 
                z-50 grid h-14 
                grid-cols-[1fr_auto_1fr] items-center 
                rounded-none lg:rounded-tl-lg lg:rounded-tr-lg 
                border border-gray-200 border-border/10 
                font-tektur font-medium">


  {/* drawer for mobile that drives me crazy */}
  <div className="flex items-center h-full px-4">
  <Drawer>
    <DrawerTrigger asChild>
      <button
        type="button"
        aria-label="Open menu"
        className="block lg:hidden -ml-1 cursor-pointer"
      >
        <Menu className="h-6 w-6 text-black" />
      </button>
    </DrawerTrigger>
    <DrawerContent className="font-tektur bg-black backdrop-blur-xl border border-border/10 rounded-t-2xl">
      <div className="flex flex-col gap-6 p-6 font-hexaframe">
      <DrawerTitle></DrawerTitle>
        {renderNavLinks(true)}
        {renderAuthSection(true)}
      </div>
    </DrawerContent>
  </Drawer>
</div>


  {/* Center slot: nav links (desktop only) */}
  <div className="hidden lg:flex justify-center h-full items-center gap-4 px-4">
    {renderNavLinks()}
  </div>

  {/* Right slot: auth */}
  <div className="flex justify-end items-center h-full px-4">
    <div className="hidden lg:flex">{renderAuthSection()}</div>
  </div>
</nav>


    </>
  );
}
