"use client";

export default function ThankYou() {
  return (
    <div className="h-[80vh] flex items-center justify-center px-4 relative">
        <div className="w-full mx-auto text-center">
        <h1 className="font-whyte text-4xl font-bold text-black">
          Application Received!
        </h1>

        <div className="p-8 mb-8">
          <div className="space-y-4 text-black">
            <p className="text-base md:text-xl">
              We&apos;ve received your application to{" "}
              <span className="font-bold text-zinc-900">Hack The Burgh 2025</span>.
            </p>
            <p className="text-base md:text-lg">
              You can keep updating your profile until the deadline.
            </p>
            <p className="text-base md:text-lg font-medium">
              Thank you for your interest in our event, best of luck!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
