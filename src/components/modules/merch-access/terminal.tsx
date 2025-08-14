"use client";

import { useState, Fragment, useEffect } from "react";
import { useTypewriterEffect } from "~/hooks/use-typewriter-effect";

const CODE_SNIPPET = `$ connecting to HTB security system...
$ attempting to bypass firewall...
WARNING: Unauthorized access detected
$ initiating countermeasures...
$ access denied - security protocol activated
[SYSTEM] Challenge sequence initiated
$ analyzing security fragments...
$ loading modulus verification...
$ waiting for access code input...
_`;

const TERMINAL_PATTERNS = [
  { regex: /^WARNING:.+/gm, className: "text-yellow-400" },
  { regex: /\[SYSTEM\]/g, className: "text-accent-yellow" },
  { regex: /^\$ access denied.+/gm, className: "text-red-400" },
  { regex: /^\$ initiating.+/gm, className: "text-gray-400" },
  { regex: /^\$ .+/gm, className: "text-green-400" },
];

export function Terminal({ onSubmit }: { onSubmit: (input: string) => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const { displayedCode, highlightCode } = useTypewriterEffect(
    CODE_SNIPPET,
    TERMINAL_PATTERNS
  );
  const [userInput, setUserInput] = useState("");

  const lines = CODE_SNIPPET.split("\n").length;
  const lineHeight = isMobile ? 1.1 : 1.3;
  const height = `${lines * lineHeight}rem`;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(userInput);
      setUserInput("");
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleResize(media);
    media.addEventListener("change", handleResize);

    return () => media.removeEventListener("change", handleResize);
  }, []);

  return (
    <div>
      <pre
        className="overflow-x-hidden overflow-y-hidden font-mono text-xs text-white md:text-sm"
        style={{ height }}
      >
        <code>
          {displayedCode.split("\n").map((line, i) => (
            <Fragment key={`line-${i}`}>
              {highlightCode(line)}
              {"\n"}
            </Fragment>
          ))}
        </code>
      </pre>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-green-400">$</span>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent font-mono text-xs text-white outline-none md:text-sm"
          placeholder="Enter access code as hack_the_burgh_xi:(length_of_sequence)_(code))..."
        />
      </div>
    </div>
  );
}
