"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

interface DocPreviewProps {
  curl: string;
  js: string;
  python: string;
  go: string;
}

export const DocPreview: React.FC<DocPreviewProps> = ({ curl, js, python, go }) => {
  const [tab, setTab] = React.useState<"curl" | "js" | "python" | "go">("curl");
  const [copied, setCopied] = React.useState(false);

  const codeMap = { curl, js, python, go };

  const handleCopy = () => {
    navigator.clipboard?.writeText(codeMap[tab]).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {(["curl", "js", "python", "go"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1.5 text-xs font-mono rounded-t transition-colors"
              style={{
                background: tab === t ? "var(--color-surface-dark, #1E1E1E)" : "transparent",
                color: tab === t ? "var(--color-text)" : "var(--color-text-muted)",
                borderBottom: tab === t ? "2px solid var(--color-primary)" : "2px solid transparent",
              }}
            >
              {t === "curl" ? "cURL" : t === "js" ? "JavaScript" : t === "python" ? "Python" : "Go"}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 transition-colors"
          style={{ color: copied ? "var(--color-status-verified)" : "var(--color-text-muted)" }}
        >
          <Copy size={11} /> {copied ? "copied" : "copy"}
        </button>
      </div>

      <pre
        className="p-4 rounded-lg overflow-x-auto text-xs leading-relaxed font-mono"
        style={{
          background: "#1E1E1E",
          border: "1px solid var(--color-border)",
          color: "#D4AF37",
        }}
      >
        {codeMap[tab]}
      </pre>
    </div>
  );
};

export default DocPreview;