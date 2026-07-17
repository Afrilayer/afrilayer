"use client";

import * as React from "react";
import { Copy } from "lucide-react";

interface DocPreviewProps {
  curl: string;
  js: string;
  python: string;
  go: string;
}

type Tab = "curl" | "js" | "python" | "go";

export const DocPreview: React.FC<DocPreviewProps> = ({ curl, js, python, go }) => {
  const [tab, setTab] = React.useState<Tab>("curl");
  const [copied, setCopied] = React.useState(false);

  const codeMap: Record<Tab, string> = { curl, js, python, go };
  const hasCodeSamples = curl || js || python || go;

  const handleCopy = () => {
    if (!hasCodeSamples) return;
    navigator.clipboard?.writeText(codeMap[tab]).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tabClass = (active: boolean) =>
    `px-3 py-1.5 text-xs font-mono rounded-t transition-colors ${
      active
        ? "bg-surface-dark text-text border-b-2 border-primary"
        : "text-text-muted hover:text-text border-b-2 border-transparent"
    }`;

  // If no code samples exist, show a helpful empty state
  if (!hasCodeSamples) {
    return (
      <div className="mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest mb-3 text-text-muted">
          Example Code
        </h2>
        <div className="p-4 rounded-lg border border-border bg-surface-dark">
          <p className="text-sm text-text-muted">
            No code samples available yet.{" "}
            <a 
              href="https://github.com/afrilayer/afrilayer/tree/main/providers" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Contribute one via GitHub
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {(["curl", "js", "python", "go"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={tabClass(tab === t)}
              aria-pressed={tab === t}
            >
              {t === "curl" ? "cURL" : t === "js" ? "JavaScript" : t === "python" ? "Python" : "Go"}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className={`flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 transition-colors ${
            copied ? "text-status-verified" : "text-text-muted hover:text-text"
          }`}
        >
          <Copy size={11} /> {copied ? "copied" : "copy"}
        </button>
      </div>

      <pre className="p-4 rounded-lg overflow-x-auto text-xs leading-relaxed font-mono bg-surface-dark border border-border text-primary">
        {codeMap[tab]}
      </pre>
    </div>
  );
};

export default DocPreview;