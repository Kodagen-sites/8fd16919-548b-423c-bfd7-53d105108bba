import manifest from "@/content/asset-manifest.json";

type Manifest = {
  images?: Record<string, string>;
  videos?: Record<string, string>;
  videoFallbacks?: Record<string, string>;
};

const m = manifest as Manifest;
const images = m.images ?? {};
const videos = m.videos ?? {};
const videoFallbacks = m.videoFallbacks ?? {};

/** Resolve an image slot to its CDN URL, or the provided fallback. */
export function asset(slot: string, fallback = ""): string {
  return images[slot] || fallback;
}

/** Hero loop video URL (empty string if Veo clip not ready). */
export function heroVideo(): string {
  return videos["scene-1"] || "";
}

/** Best available still for the hero — video fallback poster, then curated stills. */
export function heroPoster(): string {
  return (
    videoFallbacks["scene-1"] ||
    images["section-hero-poster"] ||
    images["scene-1-end"] ||
    images["scene-1-start"] ||
    ""
  );
}
