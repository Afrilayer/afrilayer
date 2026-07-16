"use client";

import * as React from "react";

interface StampProps {
  label: string;
  sublabel?: string;
  size?: "sm" | "lg";
}

export const Stamp: React.FC<StampProps> = ({ label, sublabel, size = "sm" }) => {
  const dims = size === "lg" ? "w-40 h-40" : "w-16 h-16";
  const textSize = size === "lg" ? "text-xs" : "text-[8px]";

  return (
    <div
      className={`${dims} rounded-full flex flex-col items-center justify-center shrink-0 select-none`}
      style={{
        border: "2px dashed var(--color-primary)",
        transform: "rotate(-9deg)",
        color: "var(--color-primary)",
      }}
    >
      <span className={`${textSize} font-mono tracking-[0.2em] font-bold`}>{label}</span>
      {sublabel && (
        <span
          className={`${textSize} font-mono tracking-widest mt-1`}
          style={{ color: "var(--color-primary-hover)" }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
};

export default Stamp;