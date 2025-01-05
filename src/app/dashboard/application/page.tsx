import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();
  const user = await api.user.get();

  console.log(user)

  return (
    <div className="mx-auto w-full max-w-screen-md py-20">
      <h1 className="text-center text-2xl font-bold">Application</h1>
      <div className="mx-auto max-w-lg py-10">
        {application && (
          <div className="flex flex-col gap-12">
            <div className="flex flex-wrap gap-12 ">
              <div>
                <h2 className="text-lg font-semibold">Status</h2>
                <p>{application.status}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Applied at</h2>
                <p>{application.created_at.toLocaleDateString()}</p>
              </div>
              {application.team && (
                <>
                  <div>
                    <h2 className="text-lg font-semibold">Team</h2>
                    <p>{application.team.name}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">Team Code</h2>
                    <p>{application.team.code}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-12 gap-y-4">
              <div>
                <h2 className="text-lg font-semibold">First name</h2>
                <p>{user?.first_name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Last name</h2>
                <p>{user?.last_name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Country</h2>
                <p>{user?.country}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">University</h2>
                <p>{user?.university_name}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">University email</h2>
                <p>{user?.university_email}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">University year</h2>
                <p>{user?.university_year}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">CV</h2>
                <a href={user?.cv_url ?? "#"} target="_blank" className="text-blue-500 underline ">
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
        {!application && (
          <div className="space-y-4 py-10">
            <p>You haven't applied yet!</p>

            <Button asChild>
              <Link href={"/apply"}>Apply</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
