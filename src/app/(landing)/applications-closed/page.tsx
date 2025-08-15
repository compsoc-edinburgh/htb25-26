import Link from "next/link";

export default async function ApplicationsClosed() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col justify-center px-2 md:h-screen md:min-h-full md:pt-6">
      <h1 className="text-center text-xl font-bold md:text-2xl">
        Applications were closed on 11/02/2025 at 12:00AM
      </h1>
      <p className="pt-2 text-center text-sm text-muted-foreground md:text-base">
        If you&apos;ve applied and want to check the status of your application,
        please{" "}
        <Link href="/dashboard" className="underline">
          sign in
        </Link>
        .
      </p>
    </div>
  );
}
