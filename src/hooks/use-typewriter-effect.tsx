import { useCallback, useEffect, useMemo, useState } from "react";

interface SyntaxPattern {
  regex: RegExp;
  className: string;
}

export function useTypewriterEffect(
  codeSnippet: string,
  syntaxPatterns: SyntaxPattern[],
  typingSpeed = 50
) {
  const [displayedCode, setDisplayedCode] = useState("");
  
  const codeString = useMemo(() => codeSnippet, [codeSnippet]);

  useEffect(() => {
    let currentIndex = 0;
    let isTypingActive = true;

    const typingAnimation = setInterval(() => {
      if (!isTypingActive) return;
      
      if (currentIndex <= codeString.length) {
        setDisplayedCode(codeString.slice(0, currentIndex));
        currentIndex++;
      }
      else {
        clearInterval(typingAnimation);
      }
    }, typingSpeed);

    return () => {
      isTypingActive = false;
      clearInterval(typingAnimation);
    };
  }, [codeString, typingSpeed]);

  const highlightCode = useCallback((code: string) => {
    const parts = [];
    let currentIndex = 0;

    while (currentIndex < code.length) {
      syntaxPatterns.forEach(pattern => {
        pattern.regex.lastIndex = currentIndex;
      });

      const matches = syntaxPatterns
        .map(({ regex, className }) => {
          const match = regex.exec(code);
          return match ? { match, className, index: match.index } : null;
        })
        .filter(Boolean);

      if (matches.length === 0) {
        parts.push(code.slice(currentIndex, currentIndex + 1));
        currentIndex++;
        continue;
      }

      const earliestMatch = matches.reduce((earliest, current) => 
        current!.index < earliest!.index ? current : earliest
      );

      if (earliestMatch!.index > currentIndex) {
        parts.push(code.slice(currentIndex, earliestMatch!.index));
      }

      parts.push(
        <span key={`${currentIndex}-${earliestMatch!.match[0]}`} className={earliestMatch!.className}>
          {earliestMatch!.match[0]}
        </span>
      );

      currentIndex = earliestMatch!.index + earliestMatch!.match[0].length;
    }

    return parts;
  }, [syntaxPatterns]);

  return { displayedCode, highlightCode };
}