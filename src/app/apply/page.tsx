import { api } from "~/trpc/server";
import ApplicationForm from "./application-form";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Navbar from "~/components/navbar";
import WebGLBackground from "~/components/gradient-background";
import Link from "next/link";

export default async function ApplyPage() {
  const application = await api.application.getUserApplication();
  const clerkUser = await currentUser();

  if (!clerkUser?.id) {
    redirect("/signin");
  }

  // Had to do this here so that we don't have to deal with webhooks,
  // had a problem with saving the user in the db after social signin
  var user = await api.user.get();

  if (!user) {
    user = await api.user.create({
      clerkId: clerkUser?.id,
      email: clerkUser.primaryEmailAddress?.emailAddress as string,
    });
  }

  if (application) {
    redirect("/application");
  }

  return (
    <div className="mx-auto flex h-screen max-w-screen-md flex-col justify-center">
      <WebGLBackground />
      <Link href={"/"}>
        <img
          src="/HB-icon-neon-small.png"
          className="absolute left-0 top-0 z-50 m-6 h-12 hidden md:block"
        />
      </Link>
      {/* <div className="left-0 top-0 mx-auto w-full">
        <Navbar />
      </div> */}
      <ApplicationForm user={user} />
    </div>
  );
}
