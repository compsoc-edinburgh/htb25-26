import { api } from "~/trpc/server";
import ApplicationForm from "./application-form";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Navbar from "~/components/navbar";

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
    <div className="mx-auto max-w-screen-md">
      <Navbar />
      {/* <h1 className="text-center text-3xl font-semibold mt-10">
        Apply to Hack The Burgh XI
      </h1> */}
      <ApplicationForm user={user} />
    </div>
  );
}
