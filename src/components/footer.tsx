import { Linkedin, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="flex w-full flex-col gap-4 rounded-lg bg-accent-yellow p-4 text-black shadow-md">
        <div className="flex flex-col items-center justify-between gap-8 px-4 md:flex-row md:gap-0 md:px-10">
          <div className="flex items-center gap-4">
            <div className="group relative">
              <Image
                src="/HB-icon.png"
                alt="HTB Logo"
                width={60}
                height={60}
                className="h-auto w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Hack the Burgh
              </h2>
              <p className="max-w-sm text-xs font-medium text-gray-700">
                A student hackathon at the University of Edinburgh.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row">
            <div>
              <h3 className="mb-3 text-center text-sm font-bold text-gray-800 sm:text-left">
                Connect With Us
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.linkedin.com/company/hacktheburgh"
                  className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="rounded-full bg-black/5 p-1 transition-colors duration-200 group-hover:bg-black/10">
                    <Linkedin className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/hacktheburgh"
                  className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="rounded-full bg-black/5 p-1 transition-colors duration-200 group-hover:bg-black/10">
                    <Instagram className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium">Instagram</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-center text-sm font-bold text-gray-800 sm:text-left">
                Get in Touch
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:hello@hacktheburgh.com"
                  className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-gray-600"
                >
                  <span className="rounded-full bg-black/5 p-1 transition-colors duration-200 group-hover:bg-black/10">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium">Contact Us</span>
                </a>
                <a
                  href="mailto:communications@hacktheburgh.com"
                  className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-gray-600"
                >
                  <span className="rounded-full bg-black/5 p-1 transition-colors duration-200 group-hover:bg-black/10">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium">Sponsor Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-4 flex flex-col items-center justify-center gap-2 text-[10px] text-gray-400 sm:flex-row">
        <a
          href="/documents/HTB-Code-of-Conduct.pdf"
          className="transition-colors duration-200 hover:text-gray-300"
        >
          Code of Conduct
        </a>
        <span className="hidden text-gray-500 sm:inline">•</span>
        <a
          href="/documents/HTB-Privacy-Policy.pdf"
          className="transition-colors duration-200 hover:text-gray-300"
        >
          Privacy Policy
        </a>
        <span className="hidden text-gray-500 sm:inline">•</span>
        <div>
          © {new Date().getFullYear()} Hack the Burgh. All rights reserved.
        </div>
      </div>
    </>
  );
}
