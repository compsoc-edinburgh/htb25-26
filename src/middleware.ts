import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isBeforeOpenDate } from "~/lib/date-gate";

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const url = new URL(req.url);
  const path = url.pathname;

  if (isBeforeOpenDate()) {
    const gatedPaths = [
      "/apply",
      "/dashboard",
      "/api/trpc",
      "/api/uploadthing",
    ];

    const isGated = gatedPaths.some(
      (p) => path === p || path.startsWith(p + "/")
    );

    if (isGated) {
      const isAdmin = sessionClaims?.metadata?.role === "admin";
      const isAdminPath = path.startsWith("/dashboard/admin");
      if (!isAdminPath || !isAdmin) {
        return NextResponse.redirect(new URL("/applications-closed", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
