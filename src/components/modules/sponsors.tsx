"use client";

import { ArrowUpRight } from "lucide-react";
import CornerBrackets from "~/components/modules/corner-brackets";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SectionHeader from "./section-header";
import NavbarLayout from "./navbar-layout";

interface SponsorCardProps {
  name: string;
  tier: string;
  overview: string;
  prizes: Array<string>;
  number: string;
  logo: string;
  onHover: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

// Collapsible container for mobile card with GSAP open/close animation
const MobileExpander = ({
  open,
  id,
  children,
}: {
  open: boolean;
  id: string;
  children: React.ReactNode;
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (open) {
      gsap.fromTo(
        el,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        height: 0,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  return (
    <div
      id={id}
      ref={wrapperRef}
      style={{ overflow: "hidden", height: 0, opacity: 0 }}
      aria-hidden={!open}
      className="mt-4"
    >
      {children}
    </div>
  );
};

// Mobile-only simplified card (no hover GSAP, stacked layout)
const MobileSponsorCard = ({
  name,
  tier,
  overview,
  prizes,
  number,
}: Pick<
  SponsorCardProps,
  "name" | "tier" | "overview" | "prizes" | "number"
>) => {
  const cornersRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const corners = cornersRef.current;
    const content = contentRef.current;
    if (!corners || !content) return;

    // Prepare initial state
    gsap.set(content, { autoAlpha: 0, y: 15, scale: 0.95 });
    gsap.set(corners.querySelectorAll("svg"), {
      scale: 0.8,
      transformOrigin: "center",
    });

    const tl = gsap.timeline();

    // First animate corners expanding outward
    tl.to(corners.querySelectorAll("svg"), {
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.1,
        from: "random",
      },
    })
      // Then fade and slide in content with slight bounce
      .to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full px-6 pb-10 pt-10 text-black">
      <div ref={cornersRef}>
        <CornerBrackets />
      </div>

      <div ref={contentRef}>
        <div className="mb-5 flex items-end gap-3">
          <h2 className="-mb-1 font-whyte text-2xl font-bold uppercase sm:text-3xl">
            {name}
          </h2>
          <div className="mb-1 ml-2 flex items-center gap-2">
            <div className="h-2 w-2 bg-black" />
            <p className="text-[0.65rem] font-light uppercase tracking-wide">
              {tier}
            </p>
          </div>
        </div>

        <div className="my-4 h-px w-full bg-black" />

        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <div className="text-[0.8rem] font-light uppercase tracking-wide">
              Overview:
            </div>
            <div className="text-[0.8rem] font-light uppercase tracking-wide">
              {overview}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-[0.8rem] font-light uppercase tracking-wide">
              Prizes:
            </div>
            <ul className="space-y-0 text-[0.8rem] font-light uppercase tracking-wide">
              {prizes.map((prize, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="leading-relaxed">{prize}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <span className="absolute -bottom-4 right-0 inline-block text-[0.6rem] font-light uppercase tracking-wide">
          {number}
        </span>

        <span className="absolute -top-4 right-0 inline-block text-[0.8rem] font-light uppercase tracking-wide">
          +
        </span>
      </div>
    </div>
  );
};

const TIERS = {
  PLATINUM: "PLATINUM",
  GOLD: "GOLD",
  SILVER: "SILVER",
  BRONZE: "BRONZE",
} as const;

const TIER_COLORS = {
  [TIERS.PLATINUM]: "#d2d2d2",
  [TIERS.GOLD]: "#FFD700",
  [TIERS.SILVER]: "#C0C0C0",
  [TIERS.BRONZE]: "#CD7F32",
} as const;

const sponsorsData = [
  {
    name: "Optiver",
    tier: "PLATINUM",
    overview:
      "Optiver is a global market maker. As one of the oldest market making firms in the world, Optiver has been improving financial markets since 1986.",
    prizes: [
      "1st Prize: Latest iPhone Pro",
      "2nd Prize: iPad Pro",
      "3rd Prize: Apple AirPods Pro",
    ],
    number: "01",
    logo: "/sponsors/optiver.svg",
  },
  {
    name: "Lloyds Banking Group",
    tier: "GOLD",
    overview:
      "Lloyds Banking Group is one of the UK's leading financial services companies, serving millions of customers and providing comprehensive banking solutions.",
    prizes: [
      "1st Prize: Samsung Galaxy Tab S9",
      "2nd Prize: Microsoft Surface",
      "3rd Prize: Premium Tech Bundle",
    ],
    number: "02",
    logo: "/sponsors/lloyds.svg",
  },
  {
    name: "G-Research",
    tier: "SILVER",
    overview:
      "G-Research is a leading quantitative research and technology company, using machine learning and big data to predict movements in financial markets.",
    prizes: [
      "1st Prize: Gaming Setup",
      "2nd Prize: Mechanical Keyboard",
      "3rd Prize: Premium Swag Bundle",
    ],
    number: "03",
    logo: "/sponsors/g-research.svg",
  },
  {
    name: "DoraHacks",
    tier: "BRONZE",
    overview:
      "DoraHacks is a global hackathon organizer and one of the world's most active developer incentive platforms, fostering innovation in blockchain and emerging technologies.",
    prizes: [
      "1st Prize: Exclusive Swag",
      "2nd Prize: DoraHacks Merch",
      "3rd Prize: Community Access",
    ],
    number: "06",
    logo: "/sponsors/dorahacks.png",
  },
];

const SponsorCard = ({
  name,
  tier,
  overview,
  prizes,
  number,
  logo,
  onHover,
  cardRef,
}: SponsorCardProps) => {
  const cornerBracketsRef = useRef<HTMLDivElement>(null);
  const squareIconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tierDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const corners = cornerBracketsRef.current;
    const squares = squareIconRef.current;
    const title = titleRef.current;
    const dot = tierDotRef.current;

    if (!card || !corners || !squares || !title || !dot) return;

    const handleMouseEnter = () => {
      // gsap.to(corners.querySelectorAll("div"), {
      //   scale: 1.05,
      //   duration: 0.3,
      //   ease: "power2.out",
      //   stagger: 0.02,
      // });

      gsap.to(squares.querySelectorAll("rect"), {
        fill: "black",
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.02,
      });

      gsap.to(title, {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
      });

      // gsap.to(dot, {
      //   scale: 1.2,
      //   duration: 0.2,
      //   ease: "power2.out",
      // });
    };

    const handleMouseLeave = () => {
      // gsap.to(corners.querySelectorAll("div"), {
      //   scale: 1,
      //   duration: 0.3,
      //   ease: "power2.out",
      //   stagger: 0.02,
      // });

      gsap.to(squares.querySelectorAll("rect"), {
        fill: "none",
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.02,
      });

      gsap.to(title, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // gsap.to(dot, {
      //   scale: 1,
      //   duration: 0.2,
      //   ease: "power2.out",
      // });
    };

    const handleClick = () => {
      // Animate corner brackets inward on click
      const svgs = corners.querySelectorAll("svg");
      gsap.to(svgs, {
        scale: 0.98,
        duration: 0.2,
        ease: "power4.inOut",
        yoyo: true,
        repeat: 1,
        transformOrigin: "center",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative h-full w-full cursor-pointer px-10 pb-8 pt-7 text-black transition-shadow duration-300"
      onMouseEnter={onHover}
    >
      <div ref={cornerBracketsRef}>
        <CornerBrackets />
      </div>

      <div className="mb-6 flex flex-wrap items-end gap-3 sm:gap-4">
        <h1
          ref={titleRef}
          className="-mb-5 mt-3 flex cursor-pointer items-center gap-3 font-whyte text-3xl font-bold uppercase leading-none sm:text-4xl md:text-5xl"
        >
          {name}
        </h1>
        <div className="ml-2 flex items-center gap-2 pt-1">
          <div ref={tierDotRef} className="-mb-1 h-2 w-2 bg-black" />
          <p className="-mb-1 text-xs font-light uppercase tracking-wide sm:text-xs">
            {tier}
          </p>
        </div>
      </div>

      <div className="my-6 h-px w-full bg-black sm:my-8" />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        <div className="flex flex-row gap-3 sm:gap-4">
          <div className="text-[0.8rem] font-light uppercase tracking-wide">
            Overview:
          </div>
          <div className="text-[0.8rem] font-light uppercase tracking-wide">
            {overview}
          </div>
        </div>
        <div className="flex flex-row gap-3 sm:gap-4">
          <div className="text-[0.8rem] font-light uppercase tracking-wide">
            Prizes:
          </div>
          <ul className="space-y-1 text-[0.8rem] font-light uppercase tracking-wide">
            {prizes.map((prize, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="leading-relaxed">{prize}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="absolute bottom-5 left-5 inline-block text-[0.6rem] font-light uppercase tracking-wide">
        {number}
      </span>

      <span className="absolute bottom-5 right-5 inline-block text-[0.6rem] font-light uppercase tracking-wide">
        +
      </span>

      <div
        ref={squareIconRef}
        className="absolute right-5 top-5 inline-block text-[0.6rem] font-light uppercase tracking-wide"
      >
        <svg
          width="6"
          height="24"
          viewBox="0 0 6 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="5" height="5" stroke="black" />
          <rect x="0.5" y="9.5" width="5" height="5" stroke="black" />
          <rect x="0.5" y="18.5" width="5" height="5" stroke="black" />
        </svg>
      </div>
    </div>
  );
};

export const SponsorsGrid = () => {
  const [currentLogo, setCurrentLogo] = useState(
    sponsorsData[0]?.logo || "/sponsors/optiver.svg"
  );
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoImageRef = useRef<HTMLImageElement>(null);
  const cardRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    sponsorsData.map(() => React.createRef<HTMLDivElement>())
  );
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial logo and position to match first card
    const setupInitialPosition = () => {
      if (
        logoImageRef.current &&
        logoContainerRef.current &&
        cardRefs.current[0]?.current
      ) {
        gsap.set(logoImageRef.current, { opacity: 1, scale: 1 });

        // Position logo container to match first card initially
        const firstCard = cardRefs.current[0].current;
        const logoContainer = logoContainerRef.current;
        const logoContainerParent = logoContainer.parentElement;

        if (!logoContainerParent) return;

        const firstCardRect = firstCard.getBoundingClientRect();
        const logoParentRect = logoContainerParent.getBoundingClientRect();

        // Calculate the initial Y position relative to the logo container's parent
        const initialY = firstCardRect.top - logoParentRect.top;

        // Ensure the initial position is not negative (above the first card)
        const constrainedInitialY = Math.max(0, initialY);

        gsap.set(logoContainer, {
          y: constrainedInitialY,
          height: firstCardRect.height,
        });
      } else {
        // If elements aren't ready yet, try again on next frame
        requestAnimationFrame(setupInitialPosition);
      }
    };

    // Handle window resize to recalculate positions
    const handleResize = () => {
      setupInitialPosition();
    };

    // Delay initial setup to ensure elements are rendered
    const timeoutId = setTimeout(setupInitialPosition, 100);

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Removed scroll-into-view behavior for mobile expansion

  // Clamp the logo container within the bounds of the first and last cards on scroll/resize
  useEffect(() => {
    const clampLogoPosition = () => {
      const logoContainer = logoContainerRef.current;
      const firstCard = cardRefs.current[0]?.current;
      const lastCard = cardRefs.current[cardRefs.current.length - 1]?.current;
      if (!logoContainer || !firstCard || !lastCard) return;

      const parent = logoContainer.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const firstRect = firstCard.getBoundingClientRect();
      const lastRect = lastCard.getBoundingClientRect();

      const currentY = Number(gsap.getProperty(logoContainer, "y")) || 0;
      const currentH = logoContainer.getBoundingClientRect().height;

      const minY = firstRect.top - parentRect.top;
      const maxY = lastRect.bottom - parentRect.top - currentH;

      const clampedY = Math.max(minY, Math.min(currentY, maxY));
      if (clampedY !== currentY) {
        gsap.to(logoContainer, {
          y: clampedY,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const onScroll = () => clampLogoPosition();
    const onResize = () => clampLogoPosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    clampLogoPosition();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleSponsorHover = (index: number, logo: string) => {
    const logoContainer = logoContainerRef.current;
    const logoImage = logoImageRef.current;
    const hoveredCard = cardRefs.current[index]?.current;
    const gridContainer = gridContainerRef.current;

    if (!logoContainer || !logoImage || !hoveredCard || !gridContainer) return;

    // Get the logo container's parent element
    const logoContainerParent = logoContainer.parentElement;
    if (!logoContainerParent) return;

    // Get positions relative to the logo container's parent
    const cardRect = hoveredCard.getBoundingClientRect();
    const logoParentRect = logoContainerParent.getBoundingClientRect();

    // Calculate the target Y position relative to the logo container's parent
    let targetY = cardRect.top - logoParentRect.top;
    const targetHeight = cardRect.height;

    // Get first and last card positions for boundary constraints
    const firstCard = cardRefs.current[0]?.current;
    const lastCard = cardRefs.current[cardRefs.current.length - 1]?.current;

    if (firstCard && lastCard) {
      const firstCardRect = firstCard.getBoundingClientRect();
      const lastCardRect = lastCard.getBoundingClientRect();

      // Calculate boundaries relative to logo parent
      const minY = firstCardRect.top - logoParentRect.top;
      const maxY = lastCardRect.bottom - logoParentRect.top - targetHeight;

      // Constrain the target position within boundaries
      targetY = Math.max(minY, Math.min(targetY, maxY));
    }

    // Move logo container to match card position and height
    gsap.to(logoContainer, {
      y: targetY,
      height: targetHeight,
      duration: 0.4,
      ease: "power2.out",
    });

    // Change logo with same animation specs as Framer Motion version
    if (currentLogo !== logo) {
      gsap.to(logoImage, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentLogo(logo);
          gsap.fromTo(
            logoImage,
            { opacity: 0, scale: 0.8, y: -20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.inOut",
            }
          );
        },
      });
    }
  };

  return (
    <div className="h-full w-full px-4 sm:px-8">
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 gap-8 sm:gap-12">
          {sponsorsData.map((sponsor, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  // Animate corner brackets inward on click
                  const button = e.currentTarget;
                  const corners = button.querySelector(
                    "[data-corner-brackets]"
                  );
                  if (corners) {
                    const svgs = corners.querySelectorAll("svg");
                    gsap.to(svgs, {
                      scale: 0.99,
                      duration: 0.2,
                      ease: "power4.inOut",
                      yoyo: true,
                      repeat: 1,
                      transformOrigin: "center",
                    });
                  }

                  setMobileOpenIndex((prev) => (prev === index ? null : index));
                }}
                className="relative flex h-40 w-full items-center justify-center p-4 pt-1 sm:h-48 sm:p-6"
                aria-expanded={mobileOpenIndex === index}
                aria-controls={`mobile-sponsor-${index}`}
              >
                <div data-corner-brackets>
                  <CornerBrackets />
                </div>
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={160}
                  height={100}
                  className="max-h-24 max-w-full object-contain sm:max-h-28"
                />
                <span
                  className="absolute bottom-4 left-4 px-1 text-[0.6rem] font-medium uppercase tracking-wide sm:text-sm"
                  // style={{
                  //   color:
                  //     TIER_COLORS[sponsor.tier as keyof typeof TIER_COLORS],
                  // }}
                >
                  {sponsor.tier}
                </span>
                <span className="absolute right-4 top-4 inline-block text-[0.6rem] font-light uppercase tracking-wide">
                  <svg
                    width="4"
                    height="24"
                    viewBox="0 0 6 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="0.5" y="0.5" width="5" height="5" stroke="black" />
                    <rect x="0.5" y="9.5" width="5" height="5" stroke="black" />
                    <rect
                      x="0.5"
                      y="18.5"
                      width="5"
                      height="5"
                      stroke="black"
                    />
                  </svg>
                </span>
              </button>

              <MobileExpander
                open={mobileOpenIndex === index}
                id={`mobile-sponsor-${index}`}
              >
                <MobileSponsorCard
                  name={sponsor.name}
                  tier={sponsor.tier}
                  overview={sponsor.overview}
                  prizes={sponsor.prizes}
                  number={sponsor.number}
                />
              </MobileExpander>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden flex-col gap-8 lg:flex lg:flex-row lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:w-80 lg:self-start">
          <div
            ref={logoContainerRef}
            className="flex items-center justify-center overflow-hidden p-8"
            style={{ height: "300px" }} // Initial height
          >
            <CornerBrackets />
            <div className="flex items-center justify-center">
              <Image
                ref={logoImageRef}
                src={currentLogo}
                alt="Sponsor logo"
                width={200}
                height={120}
                className="max-h-32 max-w-full object-contain"
              />
            </div>
            <span className="absolute bottom-4 left-4 text-[0.6rem] flex gap-2 items-center font-light uppercase tracking-wide">
              <div className="h-2 w-2 bg-black" />
              [LOGO]
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div ref={gridContainerRef} className="max-w-6xl space-y-8">
            {sponsorsData.map((sponsor, index) => (
              <div key={index}>
                <SponsorCard
                  name={sponsor.name}
                  tier={sponsor.tier}
                  overview={sponsor.overview}
                  prizes={sponsor.prizes}
                  number={sponsor.number}
                  logo={sponsor.logo}
                  onHover={() => handleSponsorHover(index, sponsor.logo)}
                  cardRef={cardRefs.current[index]!}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Sponsors() {
  return (
    <NavbarLayout className="relative min-h-screen w-full py-16 sm:py-24">
      <SectionHeader
        title="SPONSORS"
        subtitle="Meet the organizations making this hackathon possible"
        className="mb-10"
      />
      <SponsorsGrid />
    </NavbarLayout>
  );
}
