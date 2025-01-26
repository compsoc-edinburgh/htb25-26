"use client";

import { Check, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Confetti, ConfettiRef } from "~/components/ui/confetti";

export default function DoneStep() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
      <div className="flex justify-center">
        <PartyPopper size={40} />
      </div>
      <h1 className="text-3xl font-medium">Application sent</h1>
      <p className="text-center font-sans">
        Your application was successfully submitted. Keep an eye on your inbox
        for updates.
      </p>
      <Button>
        <Link href="/dashboard/application">Back to dashboard</Link>
      </Button>
    </div>
  );
}
