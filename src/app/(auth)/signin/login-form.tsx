"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/shared/error";
import { ClerkAPIError } from "@clerk/types";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (e) {
      if (isClerkAPIResponseError(e)) setErrors(e.errors);
      else toast.error("An unknown error occurred");
      console.error(JSON.stringify(e, null, 2));
    }

    setLoading(false);
  };

  return (
    <div
      className={cn("flex max-w-md flex-col gap-6 p-5", className)}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <svg
                  width="178"
                  height="156"
                  viewBox="0 0 178 156"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100.196 99.9757C100.9 103.025 105.218 103.095 106.019 100.069L107.357 95.0209C107.705 93.7054 108.896 92.7893 110.257 92.7893H151.894C154.207 92.7893 155.65 95.2979 154.487 97.2979L127.961 142.893C127.424 143.816 126.436 144.385 125.368 144.385H52.9671C51.8559 144.385 50.8357 143.77 50.3158 142.788L49.0072 140.316C48.5293 139.414 48.5435 138.33 49.0448 137.44L73.3397 94.3168C73.8714 93.3731 74.8704 92.7893 75.9535 92.7893H96.1511C97.5481 92.7893 98.7602 93.7535 99.0743 95.1147L100.196 99.9757ZM63.1618 21.5016C63.764 22.4369 63.7992 23.6286 63.2534 24.5979L49.0663 49.787C48.5533 50.6979 48.5515 51.8102 49.0614 52.7227L54.9521 63.2639C56.079 65.2805 58.9668 65.3201 60.1486 63.3351L71.5634 44.1628C72.74 42.1864 75.6115 42.2149 76.7488 44.2142L83.4096 55.9244C83.9362 56.8501 83.9324 57.9857 83.3998 58.908L44.9894 125.416C43.8741 127.347 41.1162 127.43 39.8877 125.568L32.877 114.946C32.2498 113.996 32.2146 112.772 32.7863 111.788L47.3599 86.6804C47.9039 85.7434 47.9003 84.5859 47.3506 83.6522L40.6718 72.309C39.4964 70.3126 36.598 70.3453 35.4678 72.3677L25.0795 90.9573C23.9665 92.9489 21.1258 93.0186 19.9167 91.0839L13.017 80.0445C12.4276 79.1014 12.4083 77.9097 12.9668 76.9479L50.2936 12.6714C50.8305 11.7469 51.8188 11.178 52.8879 11.178H54.8786C55.8987 11.178 56.8488 11.6963 57.401 12.554L63.1618 21.5016ZM85.866 109.988C84.7747 109.988 83.7695 110.58 83.2411 111.535L77.3133 122.247C76.2068 124.246 77.6529 126.699 79.9382 126.699H89.475C91.3841 126.699 92.8076 124.94 92.4088 123.073L90.1209 112.361C89.8252 110.977 88.6024 109.988 87.187 109.988H85.866ZM117.987 109.988C116.653 109.988 115.48 110.868 115.107 112.149L111.987 122.86C111.428 124.78 112.868 126.699 114.867 126.699H115.19C116.235 126.699 117.204 126.156 117.749 125.265L124.301 114.553C125.524 112.554 124.085 109.988 121.742 109.988H117.987ZM96.0736 78.9262C97.1801 80.9258 95.734 83.3788 93.4487 83.3788H84.5374C82.2036 83.3788 80.7635 80.8312 81.9671 78.8317L86.61 71.1185C87.8009 69.14 90.687 69.1926 91.8051 71.2131L96.0736 78.9262ZM120.462 78.8317C121.666 80.8312 120.226 83.3788 117.892 83.3788H109.702C108.618 83.3788 107.619 82.7948 107.088 81.8508L101.056 71.1392C99.9297 69.1393 101.375 66.6672 103.67 66.6672H111.444C112.497 66.6672 113.472 67.2185 114.015 68.12L120.462 78.8317ZM135.09 24.3799C136.227 26.3798 134.783 28.8631 132.482 28.8631H122.081C119.769 28.8631 118.326 31.369 119.487 33.369L145.895 78.873C147.056 80.873 145.613 83.3788 143.301 83.3788H131.43C130.354 83.3788 129.36 82.802 128.826 81.8673L99.4014 30.3747C98.8673 29.44 97.8733 28.8631 96.7967 28.8631H79.3386C78.2673 28.8631 77.2773 28.2919 76.7412 27.3644L69.9874 15.6792C68.8315 13.6792 70.2748 11.178 72.5848 11.178H125.835C126.914 11.178 127.91 11.7571 128.443 12.6947L135.09 24.3799ZM164.832 76.95C165.372 77.9118 165.341 79.0924 164.751 80.0242L163.509 81.984C162.959 82.8525 162.003 83.3788 160.975 83.3788H156.328C155.213 83.3788 154.189 82.7598 153.671 81.7718L148.055 71.0602C147.008 69.0626 148.457 66.6672 150.712 66.6672H157.301C158.385 66.6672 159.385 67.2525 159.916 68.1981L164.832 76.95Z"
                    fill="black"
                  />
                  <path
                    d="M46.4125 0.220505C45.1368 0.632629 44.0967 1.24101 43.3313 2.04565C42.5659 2.83066 0.744428 74.6199 0.273421 75.9741C-0.119085 77.0338 -0.0798341 79.4281 0.332297 80.4486C0.999557 82.1168 42.6052 152.709 43.4098 153.553C43.8416 154.004 44.7443 154.613 45.4116 154.927L46.6087 155.476H89.2937C130.821 155.476 131.998 155.456 133.058 155.103C135.433 154.279 134.393 155.947 156.962 116.716C168.227 97.1301 177.588 80.7626 177.725 80.3309C177.882 79.9188 178 78.8982 178 78.074C178 76.7591 177.921 76.3862 177.333 75.2087C176.96 74.4433 167.618 57.9384 156.55 38.5094C142.635 14.0759 136.159 2.8699 135.531 2.16341C134.981 1.55502 134.157 0.927002 133.49 0.593384L132.371 0.043869L89.7843 0.00462341C55.7541 -0.0149994 47.0405 0.0242462 46.4125 0.220505ZM130.939 5.81371C131.272 5.95108 136.551 15.0572 151.8 41.8457C163.026 61.5495 172.23 77.8385 172.269 78.0347C172.328 78.388 131.645 149.255 131.213 149.53C131.096 149.608 112.275 149.687 89.3722 149.687C49.9843 149.687 47.7274 149.667 47.433 149.333C46.9227 148.764 5.69 78.4665 5.69 78.1721C5.69 77.6815 47.4526 5.95108 47.8255 5.79408C48.3554 5.59782 130.409 5.59782 130.939 5.81371Z"
                    fill="black"
                  />
                </svg>
              </div>
              <span className="sr-only">HTB</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome back</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-gray-500 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            {errors && (
              <ul className="my-3 box-border max-w-sm">
                {errors.map((el, index) => (
                  <li
                    key={index}
                    className="list-inside list-disc text-sm text-red-600"
                  >
                    {el.longMessage}
                  </li>
                ))}
              </ul>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-white px-2 text-zinc-600">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              className="flex w-full items-center gap-2 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </Button>
            <Button
              variant="outline"
              type="button"
              className="flex w-full items-center gap-2 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-zinc-600 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-zinc-800">
        By clicking continue, you agree to MLH&apos;s{" "}
        <a
          target="_blank"
          href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*1fc0onz*_ga*MTQzMTk5NjI2LjE3MzU1Nzc1OTU.*_ga_E5KT6TC4TK*MTczNTc1NDMzNS4yLjEuMTczNTc1NTIwNi4wLjAuMA.."
        >
          Code of Conduct
        </a>
      </div>
    </div>
  );
}
