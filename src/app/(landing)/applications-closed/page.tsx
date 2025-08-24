import Link from "next/link";
import NavbarLayout from "~/components/modules/navbar-layout";

export default async function ApplicationsClosed() {
  return (
    <main className="h-full w-full">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="flex scale-90 transform flex-col items-center px-4 text-center sm:scale-100">
          <h1 className="font-hexaframe text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Applications Closed
          </h1>

          <div className="mt-6 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 sm:text-xl">
              Applications closed on 11 February 2025 at midnight
            </p>

            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Thank you to everyone who applied! We received an incredible
              number of applications this year.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
