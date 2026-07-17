"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

type IssueType = "missing-api" | "wrong-info" | "broken-link" | "missing-logo" | "wrong-docs" | "other";

const issueTypes: { value: IssueType; label: string }[] = [
  { value: "missing-api", label: "Missing API" },
  { value: "wrong-info", label: "Wrong provider information" },
  { value: "wrong-docs", label: "Wrong documentation URL" },
  { value: "broken-link", label: "Broken link" },
  { value: "missing-logo", label: "Missing logo" },
  { value: "other", label: "Other issue" },
];

function ReportIssueContent() {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get("provider") || "";
  const nameParam = searchParams.get("name") || "";

  const [issueType, setIssueType] = React.useState<IssueType>("wrong-info");
  const [description, setDescription] = React.useState("");
  const [suggestion, setSuggestion] = React.useState("");
  const [links, setLinks] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const issueData = {
      provider: nameParam,
      slug: providerParam,
      url: `${window.location.origin}/apis/${providerParam}`,
      type: issueType,
      description,
      suggestion,
      links,
    };

    // Store in localStorage as a simple backend simulation
    // In production, this would call an API route to create a GitHub issue
    const existing = JSON.parse(localStorage.getItem("afrilayer_issues") || "[]");
    existing.push({ ...issueData, timestamp: new Date().toISOString() });
    localStorage.setItem("afrilayer_issues", JSON.stringify(existing));

    // Also try to send to API if available
    try {
      await fetch("/api/report-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueData),
      });
    } catch {
      // API may not exist yet
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
        <div className="p-8 rounded-lg border border-border bg-surface text-center">
          <div className="w-12 h-12 rounded-full bg-verified/10 flex items-center justify-center mx-auto mb-4">
            <Send size={24} className="text-verified" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">Issue Submitted</h1>
          <p className="text-muted mb-6">
            Thank you for your contribution. Your report has been recorded and will be reviewed by the maintainers.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-copper hover:underline">
            <ArrowLeft size={14} /> Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono mb-6 text-muted-dim hover:text-text transition-colors"
      >
        <ArrowLeft size={13} /> back to directory
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-text mb-2">Report an Issue</h1>

      {nameParam && (
        <p className="text-muted mb-6">
          Reporting issue for: <span className="font-semibold text-text">{nameParam}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-muted-dim mb-2" htmlFor="issue-type">
            Issue Type
          </label>
          <select
            id="issue-type"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value as IssueType)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-copper"
          >
            {issueTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-dim mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue you're experiencing..."
            required
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-copper placeholder:text-muted-dim"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-dim mb-2" htmlFor="suggestion">
            Suggested Correction (Optional)
          </label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="What would you suggest to fix this issue?"
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-copper placeholder:text-muted-dim"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-dim mb-2" htmlFor="links">
            Supporting Links (Optional)
          </label>
          <textarea
            id="links"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            placeholder="Add any relevant URLs, documentation, or references..."
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-copper placeholder:text-muted-dim"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono bg-copper text-white hover:bg-amber disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={14} />
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}

export default function ReportIssuePage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ReportIssueContent />
    </React.Suspense>
  );
}