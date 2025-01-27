import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import EditApplicationForm from "./form";
import WebGLBackground from "~/components/gradient-background";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();
  const user = await api.user.get();

  if (!application || !user) redirect("/apply");

  return (
    <div className="w-full py-20">
      <div className="relative max-w-screen-xl rounded-2xl overflow-hidden mx-auto flex h-28 w-full items-center justify-center text-center">
        <h1 className="text-center text-4xl font-bold">Your profile</h1>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-12">
          <EditApplicationForm user={user} />
        </div>
      </div>
    </div>
  );
}
