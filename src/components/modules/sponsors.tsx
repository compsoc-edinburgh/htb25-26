"use client";

import { ArrowUpRight } from "lucide-react";
import CornerBrackets from "~/components/modules/corner-brackets";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SponsorCardProps {
  name: string;
  tier: string;
  overview: string;
  prizes: Array<string>;
  number: string;
  logo: string;
  onHover: () => void;
}

const TIERS = {
  PLATINUM: "PLATINUM",
  GOLD: "GOLD",
  SILVER: "SILVER",
  BRONZE: "BRONZE",
} as const;

const TIER_COLORS = {
  [TIERS.PLATINUM]: "#4D4F51",
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
}: SponsorCardProps) => {
  return (
    <div
      className="group relative h-full w-full cursor-pointer p-6 text-black transition-shadow duration-300 sm:p-8"
      onMouseEnter={onHover}
    >
      <CornerBrackets />

      <div className="mb-6 flex flex-wrap items-end gap-3 sm:gap-4">
        <h1 className="flex cursor-pointer items-center gap-3 font-hexaframe text-3xl font-bold leading-none group-hover:underline sm:text-4xl md:text-5xl">
          {name}
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
        </h1>
        <div className="flex items-center gap-3 pt-1">
          <div
            className="h-2 w-2 sm:h-2.5 sm:w-2.5"
            style={{
              backgroundColor: TIER_COLORS[tier as keyof typeof TIER_COLORS],
            }}
          />
          <p
            className="text-sm font-medium uppercase tracking-wide sm:text-base"
            style={{ color: TIER_COLORS[tier as keyof typeof TIER_COLORS] }}
          >
            {tier}
          </p>
        </div>
      </div>

      <div className="my-6 h-px w-full bg-black sm:my-8" />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="text-sm font-medium uppercase tracking-wide text-gray-500 sm:text-base">
            Overview:
          </div>
          <div className="text-sm leading-relaxed text-gray-900 sm:text-base">
            {overview}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="text-sm font-medium uppercase tracking-wide text-gray-500 sm:text-base">
            Prizes:
          </div>
          <ul className="space-y-2 text-sm text-gray-900 sm:space-y-3 sm:text-base">
            {prizes.map((prize, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 bg-black sm:h-2 sm:w-2" />
                <span className="leading-relaxed">{prize}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="mt-8 inline-block text-sm font-medium uppercase tracking-wide text-gray-500 sm:mt-10 sm:text-base">
        {number}
      </span>
    </div>
  );
};

export const SponsorsGrid = () => {
  const [currentLogo, setCurrentLogo] = useState(
    sponsorsData[0]?.logo || "/sponsors/optiver.svg"
  );

  return (
    <div className="h-full w-full px-4 sm:px-8">
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 gap-8 sm:gap-12">
          {sponsorsData.map((sponsor, index) => (
            <div
              key={index}
              className="relative flex h-40 items-center justify-center p-4 sm:h-48 sm:p-6"
            >
              <CornerBrackets />
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                width={160}
                height={100}
                className="max-h-24 max-w-full object-contain sm:max-h-28"
              />
              <span
                className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-wide sm:text-sm"
                style={{
                  color: TIER_COLORS[sponsor.tier as keyof typeof TIER_COLORS],
                }}
              >
                {sponsor.tier}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden flex-col gap-8 lg:flex lg:flex-row lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:w-80 lg:self-start">
          <div className="flex h-64 items-center justify-center overflow-hidden p-8">
            <CornerBrackets />
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentLogo}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  scale: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="flex items-center justify-center"
              >
                <Image
                  src={currentLogo}
                  alt="Sponsor logo"
                  width={200}
                  height={120}
                  className="max-h-32 max-w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
            <motion.span
              className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-wide text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              [LOGO]
            </motion.span>
          </div>
        </div>

        <div className="flex-1">
          <div className="max-w-6xl space-y-8">
            {sponsorsData.map((sponsor, index) => (
              <div key={index}>
                <SponsorCard
                  name={sponsor.name}
                  tier={sponsor.tier}
                  overview={sponsor.overview}
                  prizes={sponsor.prizes}
                  number={sponsor.number}
                  logo={sponsor.logo}
                  onHover={() => setCurrentLogo(sponsor.logo)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
