"use client";

import { useState } from "react";

type CopyToClipboardProps = {
  text: string;
  label: string;
};

export default function CopyToClipboard({ text, label }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
        {label}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-accent/40 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-foreground/80 transition hover:border-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
