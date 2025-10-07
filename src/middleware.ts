import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Middleware configuration for Clerk authentication
 *
 * Route protection is handled at the layout level:
 * - /apply: Protected by apply/layout.tsx (checks APPLICATION_CYCLE and auth)
 * - /status: Protected by status/layout.tsx (checks auth and application exists)
 * - /dashboard: Protected by dashboard/layout.tsx (checks auth and accepted status)
 * - /dashboard/admin: Protected by dashboard/admin/layout.tsx (checks auth and admin role)
 *
 * This middleware ensures Clerk session is available across all routes
 */
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
