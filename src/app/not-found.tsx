import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <span className="font-whyte text-7xl font-bold leading-none tracking-tight sm:text-8xl md:text-9xl">404</span>
        <h1 className="text-xl font-medium sm:text-2xl">Page not found</h1>
        <p className="text-sm text-zinc-500 sm:text-base">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild size="lg">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
