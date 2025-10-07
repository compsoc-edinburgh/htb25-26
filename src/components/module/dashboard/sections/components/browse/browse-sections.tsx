"use client";

import ReactMarkdown from "react-markdown";

export function BrowseSection({
  title,
  content,
  subtitle,
  useMarkdown = false,
}: {
  title: string;
  content: string;
  subtitle?: string;
  useMarkdown?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <div className="mr-2 h-2 w-2 bg-white" />
        <h4 className="text-xs uppercase text-zinc-300">{title}</h4>
      </div>

      {useMarkdown ? (
        <div className="prose prose-sm prose-invert mt-1 max-w-none text-white">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <p className="whitespace-pre-wrap text-sm text-white">{content}</p>
      )}

      {subtitle && <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>}
    </div>
  );
}
