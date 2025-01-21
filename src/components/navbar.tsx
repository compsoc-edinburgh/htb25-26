"use client";

import { SignOutButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav className="mx-auto w-max py-3">
      <div className="flex items-center justify-between gap-16 rounded-2xl bg-white/10 px-6 py-3 font-medium text-white shadow backdrop-blur-2xl font-tektur">
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            <img src="/HB-icon-neon-small.png" className="h-9 w-full" />
          </Link>
          <Link href={"/#faq"}>FAQs</Link>
          <Link href={"/team"}>Team</Link>
          <Link href={"/sponsors"}>Sponsors</Link>
          <Link target="_blank" href={"https://2024.hacktheburgh.com"}>
            HTB 2024
          </Link>
          <Link href={"/sponsors"}>Contacts</Link>
        </div>
        <div className="flex items-center gap-8">
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
              <Button asChild className="bg-accent-yellow hover:bg-accent-yellow/90 text-black">
                <Link href={"/signup"}>Register</Link>
              </Button>
              <Link href={"/signin"}>Sign in</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
