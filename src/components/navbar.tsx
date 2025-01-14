"use client";

import { SignOutButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar({
  isAdmin = false
}: {
  isAdmin?: boolean
}) {
  const { isSignedIn, isLoaded, user } = useUser();

  return (
    <nav className="flex items-center justify-center gap-8 px-6 h-16 py-4 font-medium">
      <Link href={"/"}>Home</Link>
      {!isLoaded && <span className="text-gray-400">Loading...</span>}
      {isLoaded && isSignedIn && (
        <>
          <Link href={"/dashboard/application"}>My application</Link>
          {isAdmin && <Link href={"/dashboard/admin"}>Admin dashboard</Link>}
          <UserButton />
        </>
      )}
      {isLoaded && !isSignedIn && (
        <>
          <Link href={"/signup"}>Sign up</Link>
          <Link href={"/signin"}>Sign in</Link>
        </>
      )}
    </nav>
  );
}
