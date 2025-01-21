"use client";

import { SignOutButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav className="mx-auto w-full px-4 py-3">
      <div className="flex items-center justify-between gap-5 rounded-2xl bg-black/20 p-2 font-tektur font-medium text-white shadow backdrop-blur-2xl">
        <Link href={"/"}>
          <img src="/HB-icon-neon-small.png" className="h-9 w-full pl-3" />
        </Link>
        <div className="flex flex-1 items-center gap-1">
          <Button
            asChild
            className="h-full rounded-md bg-black/70 px-8 py-3 text-foreground font-semibold hover:bg-black/90"
          >
            <Link href={"/#faq"}>FAQs</Link>
          </Button>
          <Button
            asChild
            className="h-full rounded-md bg-black/70 px-8 py-3 text-foreground font-semibold hover:bg-black/90"
          >
            <Link href={"/team"}>Team</Link>
          </Button>
          <Button
            asChild
            className="h-full rounded-md bg-black/70 px-8 py-3 text-foreground font-semibold hover:bg-black/90"
          >
            <Link href={"/sponsors"}>Sponsors</Link>
          </Button>
          <Button
            asChild
            className="h-full rounded-md bg-black/70 px-8 py-3 text-foreground font-semibold hover:bg-black/90"
          >
            <Link target="_blank" href={"https://2024.hacktheburgh.com"}>
              HTB 2024
            </Link>
          </Button>
          <Button
            asChild
            className="h-full rounded-md bg-black/70 px-8 py-3 text-foreground font-semibold hover:bg-black/90"
          >
            <Link href={"/sponsors"}>Contacts</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {!isLoaded && <span className="text-gray-400">Loading...</span>}
          {isLoaded && isSignedIn && (
            <>
              <Link href={"/dashboard/application"}>My application</Link>
              {isAdmin && (
                <Link href={"/dashboard/admin"}>Admin dashboard</Link>
              )}
              <UserButton />
            </>
          )}
          {isLoaded && !isSignedIn && (
            <>
              <Button
                asChild
                className="h-full rounded-md bg-black/70 px-8 py-3 text-foreground hover:bg-black/90"
              >
                <Link href={"/signup"}>Register</Link>
              </Button>
              <Button className="rounded-md bg-accent-yellow px-8 py-3 text-black hover:bg-accent-yellow/90">
                <Link href={"/signin"}>Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
