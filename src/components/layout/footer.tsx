"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import React from "react";

if (typeof window !== "undefined" && !(gsap as any)._footerPlugins) {
  gsap.registerPlugin(ScrambleTextPlugin);
  (gsap as any)._footerPlugins = true;
}

const FooterSection = ({
  title,
  items,
  className = "",
}: {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
}) => {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const bg = el.querySelector(".footerlink-bg") as HTMLElement | null;
    const text = el.querySelector(".footerlink-text") as HTMLElement | null;
    if (bg) {
      gsap.killTweensOf(bg);
      gsap.fromTo(
        bg,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.25, ease: "power2.out" }
      );
    }
    if (text) {
      if (!text.dataset.originalLabel)
        text.dataset.originalLabel = text.textContent || "";
      gsap.killTweensOf(text);
      gsap.to(text, { color: "#000", duration: 0.2, ease: "power2.out" });
      gsap.to(text, {
        duration: 0.5,
        scrambleText: {
          text: text.dataset.originalLabel || "",
          chars: "upperCase",
          revealDelay: 0,
          speed: 0.6,
        },
      });
    }
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const bg = el.querySelector(".footerlink-bg") as HTMLElement | null;
    const text = el.querySelector(".footerlink-text") as HTMLElement | null;
    if (bg) {
      gsap.killTweensOf(bg);
      gsap.to(bg, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.25,
        ease: "power2.in",
      });
    }
    if (text) {
      gsap.killTweensOf(text);
      if (text.dataset.originalLabel) {
        text.textContent = text.dataset.originalLabel;
      }
      gsap.to(text, { color: "#fff", duration: 0.2, ease: "power2.out" });
    }
  };

  return (
    <div
      className={`flex flex-col justify-between px-0 py-2 pl-2 ${className}`}
    >
      <div className="mb-7 flex items-center gap-2 pt-2 md:mb-0">
        <div className="h-1.5 w-1.5 bg-white sm:h-1 sm:w-1" />
        <p className="text-[0.5rem] uppercase text-white">{title}</p>
      </div>
      <div className="md:h-aut mb-1 flex h-28 flex-col gap-2">
        {items.map((item, index) => (
          <a
            href={item.href}
            key={index}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="group relative inline-block w-fit text-[0.7rem] uppercase text-white no-underline"
          >
            <span className="footerlink-bg pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-white" />
            <span className="footerlink-text relative z-[1]">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

import { NAV_LINKS, SOCIAL_LINKS } from "~/lib/constants/navigation";
import { COPYRIGHT_TEXT } from "~/lib/constants/site";

const Footer = () => {
  return (
    <div className="relative z-50 grid w-full gap-4 bg-black p-5 sm:p-6 md:h-96 md:grid-cols-4 md:grid-rows-5">
      <div className="flex items-center border-zinc-800 px-0 md:col-span-2 md:row-span-4 md:border-b-0 md:border-r justify-center">
        <div className="select-none font-hexaframe font-bold text-white md:ml-5 md:mr-7">
          <svg
            width="647"
            height="205"
            viewBox="0 0 647 205"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <path
              d="M151.296 1.10544L179.552 1.31394C186.42 1.36461 189.829 4.82391 189.778 11.6918L188.453 191.239C188.403 198.107 184.943 201.516 178.075 201.465L149.819 201.257C142.951 201.206 139.542 197.747 139.593 190.879L140.097 122.592L49.44 121.923L48.9362 190.21C48.8855 197.078 45.4262 200.486 38.5583 200.436L10.3016 200.227C3.43371 200.176 0.0250803 196.717 0.0757555 189.849L1.40055 10.3019C1.45122 3.43396 4.91053 0.0253376 11.7785 0.0760128L40.0351 0.284505C46.903 0.33518 50.3116 3.79448 50.261 10.6624L49.6203 97.4927C49.6058 99.4549 50.5797 100.443 52.542 100.458L56.9571 100.49C58.5269 100.502 59.8067 99.9227 60.7965 98.7526L72.6787 84.1224C75.8502 79.8286 79.9869 77.7005 85.0888 77.7382L140.425 78.1465L140.918 11.3313C140.968 4.46339 144.428 1.05477 151.296 1.10544Z"
              fill="white"
            />
            <path
              d="M232.395 1.70384L406.056 2.9852C412.924 3.03587 416.333 6.49517 416.282 13.3631L416.108 36.9103C416.057 43.7782 412.598 47.1869 405.73 47.1362L326.553 46.552C324.59 46.5375 323.602 47.5114 323.588 49.4736L323.559 53.3001C323.549 54.6737 324.129 55.8554 325.299 56.8452L338.471 66.9505C342.765 70.1219 344.893 74.2586 344.855 79.3605L344.021 192.387C343.97 199.255 340.511 202.664 333.643 202.613L305.387 202.404C298.519 202.354 295.11 198.894 295.161 192.027L296.236 46.3283L232.07 45.8548C225.202 45.8041 221.793 42.3448 221.844 35.4769L222.017 11.9297C222.068 5.06179 225.527 1.65316 232.395 1.70384Z"
              fill="white"
            />
            <path
              d="M621.69 100.242L644.375 137.498C647.089 142.032 647.055 146.545 644.275 151.038L615.084 197.625C612.106 202.313 608.066 204.638 602.964 204.6L476.987 203.671C473.455 203.645 469.353 201.063 464.681 195.927L452.419 182.296C449.109 178.739 447.472 174.508 447.508 169.602L448.485 37.1492C448.522 32.2435 450.221 28.037 453.583 24.5295L466.045 11.0811C470.792 6.01393 474.931 3.4934 478.464 3.51946L600.026 4.41641C605.128 4.45406 609.133 6.83845 612.042 11.5696L640.55 57.4051C643.264 61.9386 643.231 66.4518 640.451 70.9448L621.69 100.242ZM580.856 49.3114L497.263 48.6946L496.879 100.793C496.865 102.755 497.838 103.743 499.801 103.758L503.627 103.786C505.589 103.801 506.967 103.222 507.761 102.051L518.158 89.1756C521.724 84.6884 525.861 82.4622 530.57 82.497L580.608 82.8662L590.445 66.1605L580.856 49.3114ZM496.451 158.778L583.87 159.423L593.718 141.245L584.139 122.925L499.664 122.301C497.702 122.287 496.713 123.261 496.699 125.223L496.451 158.778Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:hidden">
        <FooterSection title="Discover" items={NAV_LINKS} />
        <FooterSection title="Follow Us" items={SOCIAL_LINKS} />
      </div>

      <FooterSection
        title="Discover"
        items={NAV_LINKS}
        className="hidden md:col-start-3 md:row-span-4 md:flex md:px-5 md:pl-1"
      />
      <FooterSection
        title="Follow Us"
        items={SOCIAL_LINKS}
        className="hidden border-zinc-800 md:col-start-4 md:row-span-4 md:flex md:border-l md:px-5"
      />

      <div className="flex flex-col items-center justify-center gap-2 border-t border-zinc-800 px-5 py-3 sm:flex-row sm:justify-between sm:px-10 md:col-span-4 md:row-start-5">
        <div className="hidden text-[0.6rem] uppercase text-white opacity-50 md:block">
          MADE WITH &lt;3 BY:{" "}
          <a href="https://danyilbutov.com/" className="underline">
            Danyil
          </a>
          ,{" "}
          <a href="https://itskay.co" className="underline">
            Kay
          </a>{" "}
          ,{" "}
          <a href="https://emilymiller.xyz" className="underline">
            Emily
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/yuna-shono-1b3431188?"
            className="underline"
          >
            Yuna
          </a>
          , Abibabis{" "}
        </div>
        <div className="text-[0.6rem] uppercase text-white">
          <a
            href="/documents/HTB-Privacy-Policy.pdf"
            className="underline opacity-50 hover:opacity-100"
          >
            HTB Privacy Policy
          </a>{" "}
          <span className="opacity-50">|</span>{" "}
          <a
            href="/documents/HTB-Code-of-Conduct.pdf"
            className="underline opacity-50 hover:opacity-100"
          >
            Code Of Conduct
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
