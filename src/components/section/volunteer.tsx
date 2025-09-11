"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Volunteer() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (button) {
      // Button hover animations
      const handleMouseEnter = () => {
        gsap.to(button.querySelector("svg"), {
          x: 5,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button.querySelector("svg"), {
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const photo = photoRef.current;

    if (photo) {
      const frontImage = photo.querySelector(".front-image");
      const backImage = photo.querySelector(".back-image");

      // Photo hover animations
      const handleMouseEnter = () => {
        gsap.to(frontImage, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(backImage, {
          scale: 1.02,
          rotation: -8,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(frontImage, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(backImage, {
          scale: 1,
          rotation: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      photo.addEventListener("mouseenter", handleMouseEnter);
      photo.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        photo.removeEventListener("mouseenter", handleMouseEnter);
        photo.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);
  return (
    <div className="flex h-screen items-center" id="volunteer">
      <div className="flex-1 px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="max-w-2xl space-y-6 lg:col-span-7">
            {/* Header with bullet point */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-black" />
              <p className="font-mono text-xs uppercase tracking-wide text-black">
                WE NEED MORE HANDS
              </p>
            </div>

            {/* Main heading */}
            <h2 className="font-whyte text-2xl font-black leading-tight tracking-tight md:text-3xl lg:text-4xl">
              COULD BE ANYTHING FROM PHOTOGRAPHY, TO SOCIAL MEDIA, TO ANYTHING
              RELATED TO HELPING OUT WITH THE EVENT!
            </h2>

            {/* Volunteer button */}
            <button
              ref={buttonRef}
              onClick={() => {
                // Handle volunteer button click
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeSSBXl6ZMiTV6EVkvdoDlYGsw8K-DOFii-Kd9hQl5qY2PPYA/viewform",
                  "_blank"
                );
              }}
              className="relative h-[40px] w-[190px] cursor-pointer transition-all duration-300 md:h-[49px] md:w-[246px]"
            >
              <svg
                width="246"
                height="55"
                viewBox="0 0 246 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 8.7V16.5333L5.78378 19.6667V35.3333L1 38.4667V45.6713L7.37838 51L227.743 51L245.283 32.2V8.7L240.499 4L5.78378 4L1 8.7Z"
                  fill="black"
                  stroke="black"
                />
                <text
                  fill="white"
                  fontFamily="IBM Plex Mono"
                  fontSize="14"
                  fontWeight="600"
                  letterSpacing="0em"
                >
                  <tspan x="81" y="32.75">
                    VOLUNTEER
                  </tspan>
                </text>
              </svg>
            </button>
          </div>

          <div className="w-full max-w-xl lg:col-span-5">
            <figure
              ref={photoRef}
              className="relative w-full max-w-[560px] cursor-pointer"
            >
              {/* Back image - tilted */}
              <div className="back-image absolute inset-0 z-0 flex translate-x-4 translate-y-2 -rotate-[5deg] transform items-center justify-center bg-[#D9D9D9] p-2 pb-12">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/htb-photos/team.png"
                    alt="Hack the Burgh volunteers, 2024"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                </div>
                <figcaption className="absolute bottom-1 right-2 px-1 py-2 font-mono text-xs font-light text-black">
                  {/* HTB_2024 */}
                </figcaption>
              </div>

              {/* Front image - main */}
              <div className="front-image relative z-10 flex items-center justify-center bg-[#E5E5E5] p-2 pb-12">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/htb-photos/team.png"
                    alt="Hack the Burgh volunteers, 2024"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    priority
                  />
                </div>

                <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 px-1 py-2 font-mono text-[9px] font-light text-black">
                  {/* HTB_2024 */}
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
