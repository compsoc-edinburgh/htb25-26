import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type Application } from "@prisma/client";

interface ApplicationStatusSectionProps {
  userId: string | null;
  application: Application | null;
}

export function ApplicationStatusSection({ userId, application }: ApplicationStatusSectionProps) {
  if (userId) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <div className="space-y-3 text-center">
          <h3 className="text-2xl font-bold text-accent-yellow">Applications for HTB XI are now closed</h3>
          {application && (
            <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-white/80">
              {application.status === "pending" && (
                "Thanks for applying! We're currently reviewing your application and will notify you of the outcome soon. You can track your application status in the dashboard."
              )}
              {application.status === "accepted" && (
                "🎉 Congratulations! You've been accepted to Hack the Burgh XI. View your acceptance details in the dashboard."
              )}
              {application.status === "rejected" && (
                "We regret to inform you that your application has been rejected. We encourage you to apply again next year."
              )}
            </p>
          )}
        </div>
        {application ? (
          <Button 
            className="group relative overflow-hidden bg-accent-yellow text-black transition-all hover:scale-[1.02] hover:bg-accent-yellow/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              View Dashboard <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} />
            </Link>
          </Button>
        ) : (
          <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-white/80">
            Thank you for your interest! Applications for this year have closed, but we'd love to see you next year.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-accent-yellow">Applications for HTB XI are now closed</h3>
        <p className="mx-auto max-w-2xl font-sans text-sm text-white/80">
          Thank you for your interest! Applications for this year have closed, but we'd love to see you next year.
          If you've already submitted an application, please sign in to check your status.
        </p>
      </div>
      <Button 
        className="group relative overflow-hidden bg-accent-yellow text-black transition-all hover:scale-[1.02] hover:bg-accent-yellow/90" 
        asChild
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          Sign in <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} />
        </Link>
      </Button>
    </div>
  );
}
