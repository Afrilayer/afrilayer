"use client";

import Link from "next/link";
import { ApiCard } from "./ApiCard";
import { EmptyState } from "./EmptyState";
import type { ApiMock } from "@/lib/types";

interface SimilarApisTableProps {
  apis: ApiMock[];
}

export const SimilarApisTable = ({ apis }: SimilarApisTableProps) => {
  if (apis.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest mb-3 text-text-muted">
          Similar APIs
        </h2>
        <EmptyState
          title="No similar APIs found"
          description="There are no other APIs in this category at the moment."
        />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-xs font-mono uppercase tracking-widest mb-3 text-text-muted">
        Similar APIs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {apis.map((api) => (
          <Link
            key={api.id}
            href={`/apis/${api.id}`}
            className="block"
          >
            <ApiCard api={api} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarApisTable;