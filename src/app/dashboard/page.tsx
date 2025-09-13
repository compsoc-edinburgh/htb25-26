import { api } from "~/trpc/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import RequestAuth from "~/components/layout/request-auth";
import { redirect } from "next/navigation";
import { LogOut, UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function ApplicationPage() {
  const { userId } = await auth();
  if (!userId) return <RequestAuth mode="signin" />;

  const user = await api.user.get();
  const application = await api.application.getUserApplication();

  if (!application) {
    redirect("/apply");
  }

  const clerkUser = await currentUser();

  return (
    <div className="w-full py-20">
      <div className="relative mx-auto flex h-28 w-full max-w-screen-xl items-center justify-center overflow-hidden border border-zinc-200 bg-white text-center">
        <h1 className="text-center text-4xl font-bold">Your profile</h1>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col">
          <div className="relative flex w-full flex-col items-center justify-between gap-3 border border-zinc-200 bg-white px-6 py-4 text-black transition-all duration-300">
            <div>
              <h1>Application Status</h1>
            </div>
          </div>
          {user && (
            <div className="w-full border border-zinc-200 bg-white p-3 py-6 text-black">
              <div className="flex items-center justify-between gap-3">
                {clerkUser?.hasImage ? (
                  <div className="aspect-square max-h-12 overflow-hidden">
                    <Image
                      src={clerkUser.imageUrl}
                      className="block object-cover"
                      width={100}
                      height={100}
                      alt="User Avatar"
                    />
                  </div>
                ) : (
                  <UserIcon
                    strokeWidth={0}
                    className="bg-gradient aspect-square h-12 w-12 bg-gradient-to-b from-muted to-muted fill-white stroke-muted p-2"
                  />
                )}
                <span className="flex flex-1 flex-col">
                  <span className="text-xl font-bold">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-sm">{user.email}</span>
                </span>

                <SignOutButton>
                  <Button variant="outline">
                    Sign out <LogOut />
                  </Button>
                </SignOutButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
