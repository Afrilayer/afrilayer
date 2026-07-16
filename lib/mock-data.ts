// LEGACY FILE - REPLACED BY GIT-NATIVE DATA LOADING
// All provider data now comes from /providers/*/provider.json
// This file is kept for backward compatibility if needed

export const C = {
  bg: "#0B0D0C",
  surface: "#14171A",
  surfaceHover: "#1B1F1C",
  border: "#262A25",
  text: "#F2EFE9",
  muted: "#93968D",
  mutedDim: "#5D6058",
  copper: "#C9722A",
  amber: "#E0A34E",
  verified: "#5FA97C",
  estimated: "#D9B44E",
  cached: "#8A8D85",
  unavailable: "#C05A45",
};

export const STATUS_META = {
  Live: { color: C.verified, icon: "Check", label: "Live" },
  Estimated: { color: C.estimated, icon: "Clock", label: "Estimated" },
  Cached: { color: C.cached, icon: "Clock", label: "Cached" },
  Unavailable: { color: C.unavailable, icon: "XCircle", label: "Unavailable" },
};