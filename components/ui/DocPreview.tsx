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
              className="px-3 py-1.5 text-xs font-mono rounded-t"
              style={{
                background: tab === t ? "#14171A" : "transparent",
                color: tab === t ? "#F2EFE9" : "#5D6058",
                borderBottom: tab === t ? "2px solid #C9722A" : "2px solid transparent",
              }}
            >
              {t === "curl" ? "cURL" : t === "js" ? "JavaScript" : t === "python" ? "Python" : "Go"}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-1"
          style={{ color: copied ? "#5FA97C" : "#5D6058" }}
        >
          <Copy size={11} /> {copied ? "copied" : "copy"}
        </button>
      </div>

      <pre
        className="p-4 rounded-lg overflow-x-auto text-xs leading-relaxed font-mono"
        style={{
          background: "#14171A",
          border: "1px solid #262A25",
          color: "#E0A34E",
        }}
      >
        {codeMap[tab]}
      </pre>
    </div>
  );
};

export default DocPreview;