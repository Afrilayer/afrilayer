"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ApiCard } from "./ApiCard";
import type { ApiMock } from "@/lib/mock-data";

interface SimilarApisTableProps {
  apis: ApiMock[];
  onSelect?: (id: string) => void;
}

export const SimilarApisTable: React.FC<SimilarApisTableProps> = ({ apis, onSelect }) => {
  if (apis.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#5D6058" }}>
        Similar APIs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {apis.map((api) => (
          <ApiCard 
            key={api.id} 
            api={api} 
            onClick={onSelect ? () => onSelect(api.id) : undefined} 
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarApisTable;