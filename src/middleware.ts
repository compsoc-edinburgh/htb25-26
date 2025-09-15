import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const path = new URL(req.url).pathname;

  if (path.startsWith("/dashboard/admin")) {
    const isAdmin = sessionClaims?.metadata?.role === "admin";
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/applications-closed", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
