"use client";

export default function ThankYou() {
  return (
    <div className="relative flex h-[80vh] items-center justify-center px-4">
      <div className="mx-auto w-full text-center">
        <h1 className="font-whyte text-4xl font-bold text-black">
          Application Received!
        </h1>

        <div className="mb-8 p-8">
          <div className="space-y-4 text-black">
            <p className="text-base md:text-xl">
              We&apos;ve received your application to{" "}
              <span className="font-bold text-zinc-900">
                Hack The Burgh 2025
              </span>
              .
            </p>
            <p className="text-base md:text-lg">
              You can keep updating your profile until the deadline.
            </p>
            <p className="text-base font-medium md:text-lg">
              Thank you for your interest in our event, best of luck!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
