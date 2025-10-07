import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { env } from "~/env";
import { ApplicationStatus } from "@prisma/client";

/**
 * Ensures user is authenticated, redirects to home page if not
 * @returns userId if authenticated
 */
export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return userId;
}

/**
 * Handles redirect logic when user doesn't have an application
 * - If applications are closed: redirects to /applications-closed
 * - If applications are open: redirects to /apply
 */
export function redirectNoApplication(): never {
  if (env.APPLICATION_CYCLE === "closed") {
    redirect("/applications-closed");
  }

  redirect("/apply");
}

/**
 * Handles redirect logic when user is not accepted
 */
export function redirectStatus(status: ApplicationStatus) {
  if (status != "accepted") {
    redirect("/status");
  }
}
