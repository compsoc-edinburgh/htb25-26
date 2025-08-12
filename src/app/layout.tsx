import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hack The Burgh XII",
  description: "Hack The Burgh XII",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const hexaframe = localFont({
  src: [
    {
      path: "./fonts/hexaframe-thin.woff2",
      weight: "300",
    },
    {
      path: "./fonts/hexaframe-regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/hexaframe-heavy.woff2",
      weight: "500",
    },
    {
      path: "./fonts/hexaframe-bold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/hexaframe-extra-bold.woff2",
      weight: "600",
    },
  ],
  variable: "--font-hexaframe",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${ibmPlexMono.className} ${hexaframe.variable} ${GeistSans.variable} dark`}
      >
        <body className="bg-black">
          <Toaster
            position="bottom-center"
            toastOptions={{
              className:
                "rounded-full bg-background/70 backdrop-blur-xl border-none",
              classNames: {
                success: "bg-green-600/70",
                error: "bg-accent-red/70",
              },
            }}
          />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
