import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const path = new URL(req.url).pathname;
  const gatedPaths = ["/apply", "/dashboard", "/api/trpc", "/api/uploadthing"];

  if (gatedPaths.some((p) => path === p || path.startsWith(p + "/"))) {
    const isAdmin = sessionClaims?.metadata?.role === "admin";
    if (!path.startsWith("/dashboard/admin") || !isAdmin) {
      return NextResponse.redirect(new URL("/applications-closed", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
