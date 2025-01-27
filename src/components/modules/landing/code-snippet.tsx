'use client'

import { Fragment, useState, useEffect } from "react";
import { useTypewriterEffect } from "~/hooks/use-typewriter-effect";

const CODE_SNIPPET = `async publicProcedure.query(() => {
  return posts;
});

export const generateMetadata = publicProcedure
  .input(z.object({
    prompt: z.string().min(4).max(280),
    // Please fix: /merch-access
  }))
  .mutation(async ({ input }) => {
    const completion = await openai.chat.completions
      .create({
        model: "gpt-4-1106-preview",
        messages: [
          { role: "user", content: input.prompt }
        ]
      })`;

const SYNTAX_PATTERNS = [
  { regex: /(async|await|const|export|return|function)/g, className: "text-purple-400" },
  { regex: /(string|number|object)/g, className: "text-yellow-400" },
  { regex: /(\{|\}|\(|\))/g, className: "text-blue-400" },
  { regex: /(\/\/.+)/g, className: "text-gray-400" },
];

export function CodeSnippet() {
  const [isMobile, setIsMobile] = useState(false);
  const { displayedCode, highlightCode } = useTypewriterEffect(CODE_SNIPPET, SYNTAX_PATTERNS);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 600px)");
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleResize(media);
    media.addEventListener('change', handleResize);

    return () => media.removeEventListener('change', handleResize);
  }, []);

  const lines = CODE_SNIPPET.split('\n').length;
  const lineHeight = isMobile ? 1.1 : 1.3;
  const height = `${lines * lineHeight}rem`;

  return (
    <pre className="text-xs md:text-sm font-mono overflow-x-hidden overflow-y-hidden text-white" style={{ height }}>
      <code>
        {displayedCode.split('\n').map((line, i) => (
          <Fragment key={`line-${i}`}>
            {highlightCode(line)}
            {'\n'}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}
