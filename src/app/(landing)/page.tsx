import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";

import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const user = await auth();
  return (
    <HydrateClient>
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-center">
            Hack The Burgh XI
          </h1>
          {user.userId && (
            <Button className="text-xl font-medium">
              <Link href={"/dashboard/application"}>Apply now</Link>
            </Button>
          )}
          {!user.userId && (
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href={"/signup"}>Sign up</Link>
              </Button>
              <Button asChild>
                <Link href={"/signin"}>Sign in</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
