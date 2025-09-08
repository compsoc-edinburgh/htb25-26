const FooterSection = ({
  title,
  items,
  className = "",
}: {
  title: string;
  items: {
    label: string;
    href: string;
  }[]
  className?: string;
}) => (
  <div className={`flex flex-col justify-between px-0 py-2 pl-2 ${className}`}>
    <div className="mb-7 flex items-center gap-2 pt-2 md:mb-0">
      <div className="h-1.5 w-1.5 bg-white sm:h-2 sm:w-2" />
      <p className="text-xs uppercase text-white sm:text-sm">{title}</p>
    </div>
    <div className="flex h-28 flex-col gap-2 md:h-auto">
      {items.map((item, index) => (
        <a href={item.href} key={index} className="text-xs uppercase text-white md:text-sm hover:underline">
          {item.label}
        </a>
      ))}
    </div>
  </div>
);

const Footer = () => {
  const NAV_LINKS = [
    { href: "/#about", label: "ABOUT" },
    { href: "/#schedule", label: "SCHEDULE" },
    { href: "/#team", label: "TEAM" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#volunteer", label: "VOLUNTEER" },
  ];

  const SOCIAL_LINKS = [
    {
      label: "GITHUB",
      href: "https://github.com/compsoc-edinburgh/htb25-26",
    },
    {
      label: "INSTAGRAM",
      href: "https://www.instagram.com/hacktheburgh",
    },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/company/hacktheburgh/",
    },
  ];

  return (
    <div className="relative z-50 grid w-full gap-4 bg-black p-5 sm:p-6 md:h-96 md:grid-cols-4 md:grid-rows-5">
      <div className="flex items-center border-b border-zinc-800 px-0 md:col-span-2 md:row-span-4 md:border-b-0 md:border-r md:px-5">
        <div className="select-none font-hexaframe text-[6rem] font-bold text-white sm:text-[8rem] lg:text-[10rem] xl:text-[15rem]">
          HTB
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
        <div className="hidden text-xs text-zinc-300 md:block">
          MADE WITH &lt;3 BY: DANYIL, KAY, EMILY, YUNA, ABIBABIS
        </div>
        <div className="text-xs text-zinc-300">©CompSoc HTB Team</div>
      </div>
    </div>
  );
};

export default Footer;
