import { cn } from "~/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Sponsor {
  name: string;
  logo: string;
  website: string;
  tier: "gold" | "silver" | "bronze" | "platinum";
  isReleased?: boolean;
}

const SPONSOR_DATA: Sponsor[] = [
  {
    name: "G-Research",
    logo: "/sponsors/g-research.svg",
    website: "https://www.gresearch.com/",
    tier: "platinum",
    isReleased: true,
  },
  {
    name: "Optiver",
    logo: "/sponsors/optiver.svg",
    website: "https://www.optiver.com/",
    tier: "gold",
    isReleased: true,
  },
  {
    name: "QRT",
    logo: "/sponsors/qrt.png",
    website: "https://www.qube-rt.com/",
    tier: "gold",
    isReleased: true,
  },
  {
    name: "Lloyds Bank Group",
    logo: "/sponsors/lloyds.svg",
    website: "https://www.lloydsbankinggroup.com/",
    tier: "silver",
    isReleased: true,
  },
  {
    name: "Viridien",
    logo: "/sponsors/viridien.svg",
    website: "https://www.viridiengroup.com/",
    tier: "silver",
    isReleased: true,
  },
  {
    name: "DoraHacks",
    logo: "/sponsors/dorahacks.png",
    website: "https://dorahacks.com/",
    tier: "bronze",
    isReleased: true,
  },
];

const TIER_STYLES = {
  platinum: {
    badge: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    card: "bg-neutral-500/20 shadow-lg hover:shadow-purple-200/20 animate-shine relative overflow-hidden",
  },
  gold: {
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    card: "bg-neutral-500/20 shadow-md hover:shadow-yellow-100/20",
  },
  silver: {
    badge: "bg-gray-400/10 text-gray-400 border-gray-400/20",
    card: "bg-neutral-500/20 shadow-sm hover:shadow-gray-100/10",
  },
  bronze: {
    badge: "bg-amber-700/10 text-amber-700 border-amber-700/20",
    card: "bg-neutral-500/20",
  },
} as const;

const SponsorBox = ({
  sponsor,
  index,
}: {
  sponsor: Sponsor;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-2xl",
        "aspect-video border border-border/10 bg-white/5 p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300",
        !sponsor.isReleased && "cursor-default",
        sponsor.isReleased &&
          "hover:scale-[1.02] hover:border-accent/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
        sponsor.isReleased ? TIER_STYLES[sponsor.tier].card : ""
      )}
    >
      {sponsor.tier === "platinum" && sponsor.isReleased && (
        <div className="absolute inset-0 -translate-x-full animate-[shine_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      {sponsor.isReleased ? (
        <>
          <div className="absolute left-3 top-3">
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-xs font-medium transition-colors",
                TIER_STYLES[sponsor.tier].badge,
                "group-hover:bg-opacity-20"
              )}
            >
              {sponsor.tier.toUpperCase()}
            </span>
          </div>
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full items-center justify-center"
            aria-label={`Visit ${sponsor.name}'s website`}
          >
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              width={100}
              height={100}
              className="max-h-[60%] max-w-[60%] object-contain transition-transform group-hover:scale-105"
            />
            <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 opacity-0 transition-all duration-300 group-hover:text-accent group-hover:opacity-100" />
          </a>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="text-lg font-semibold text-accent-yellow/60">
            Coming Soon
          </div>
          <div className="text-sm text-white/40">New sponsor announcement</div>
        </div>
      )}
    </div>
  );
};

const SponsorsSection = () => {
  return (
    <section className="mx-auto mb-28 w-full max-w-7xl">
      <h2 className="mb-4 text-center font-bold sm:text-xl md:text-2xl lg:text-3xl">
        Our Sponsors
      </h2>
      <p className="mb-12 text-center text-muted-foreground">
        Meet the amazing organizations that make Hack the Burgh possible
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SPONSOR_DATA.map((sponsor, index) => (
          <SponsorBox key={sponsor.name} sponsor={sponsor} index={index} />
        ))}
      </div>
    </section>
  );
};

export const SponsorsComponents = {
  SponsorsSection,
  SPONSOR_DATA,
} as const;
