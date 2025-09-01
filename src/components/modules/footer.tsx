const Footer = () => (
  <div className="relative z-50 grid h-96 w-full grid-cols-4 grid-rows-5 bg-black">
    <div className="col-span-2 row-span-4 border-r border-zinc-800 px-5">
      <div className="select-none font-hexaframe text-[15rem] font-bold text-white">
        HTB
      </div>
    </div>
    <div className="col-start-3 row-span-4 flex flex-col justify-between px-5 py-2">
      <div className="flex items-center gap-2 pt-2">
        <div className="h-1.5 w-1.5 bg-white sm:h-2 sm:w-2" />
        <p className="text-xs uppercase text-white sm:text-sm">Discover</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm uppercase text-white">ABOUT</div>
        <div className="text-sm uppercase text-white">SCHEDULE</div>
        <div className="text-sm uppercase text-white">SPONSORS</div>
        <div className="text-sm uppercase text-white">FAQ</div>
        <div className="text-sm uppercase text-white">APPLY</div>
      </div>
    </div>
    <div className="col-start-4 row-span-4 flex flex-col justify-between border-l border-zinc-800 px-5 py-2">
      <div className="flex items-center gap-2 pt-2">
        <div className="h-1.5 w-1.5 bg-white sm:h-2 sm:w-2" />
        <p className="text-xs uppercase text-white sm:text-sm">Follow Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm uppercase text-white">GITHUB</div>
        <div className="text-sm uppercase text-white">LINKEDIN</div>
        <div className="text-sm uppercase text-white">INSTAGRAM</div>
      </div>
    </div>
    <div className="col-span-4 row-start-5 flex items-center justify-between border-t border-zinc-800 px-10">
      <div className="text-xs text-zinc-300">
        MADE WITH &lt;3 BY: DANYIL, KAY, EMILY, YUNA, ABIBABIS
      </div>
      <div className="text-xs text-zinc-300">©CompSoc HTB Team</div>
    </div>
  </div>
);

export default Footer;
