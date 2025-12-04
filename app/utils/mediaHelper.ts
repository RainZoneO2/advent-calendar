export type DayMedia = {
  imageUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
};

// Seeded PRNG (mulberry32)
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleArray<T>(arr: T[], rng: () => number = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMediaByDay(
  mediaList: string[],
  sourceFolder: string = "samples",
  seed?: number
): (DayMedia | undefined)[] {
  const imageExt = new Set(["png", "jpg", "jpeg", "webp", "gif"]);
  const videoExt = new Set(["mp4", "webm", "mov"]);
  const audioExt = new Set(["mp3", "wav", "ogg"]);

  const pool: DayMedia[] = mediaList.map((filename) => {
    const parts = filename.split(".");
    const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : "";
    const url = `/media/calendar/${sourceFolder}/${filename}`;

    if (imageExt.has(ext)) return { imageUrl: url };
    if (videoExt.has(ext)) return { videoUrl: url };
    if (audioExt.has(ext)) return { audioUrl: url };
    return { imageUrl: url };
  });

  if (pool.length === 0) {
    return Array.from({ length: 25 }, () => undefined);
  }

  const shuffledPool =
    seed == null ? shuffleArray(pool) : shuffleArray(pool, mulberry32(seed));

  const byDay: (DayMedia | undefined)[] = Array.from({ length: 25 }, (_, i) => {
    return shuffledPool[i % shuffledPool.length];
  });

  return byDay;
}

let cachedMediaList: string[] | null = null;
let cachedMediaByDay: (DayMedia | undefined)[] | null = null;
let cachedSource: string | null = null;

import mediaConfigData from "../media-config.json";
const MEDIA_CONFIG: Record<string, DayMedia> = mediaConfigData;

async function fetchMediaList(): Promise<string[]> {
  if (cachedMediaList) return cachedMediaList;

  try {
    const response = await fetch("/api/media-list");
    if (!response.ok) return [];
    const data = await response.json();
    cachedMediaList = data.files || [];
    if (cachedMediaList) {
      return cachedMediaList;
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch media list:", err);
    return [];
  }
}

async function buildMediaMapping(): Promise<(DayMedia | undefined)[]> {
  const response = await fetch("/api/media-list");
  const data = await response.json();
  const mediaList = data.files || [];
  const sourceFolder = data.source || "samples";

  // Invalidate cache if source changed
  if (cachedSource !== sourceFolder) {
    cachedMediaByDay = null;
    cachedSource = sourceFolder;
  }

  if (cachedMediaByDay) return cachedMediaByDay;

  cachedMediaByDay = buildMediaByDay(mediaList, sourceFolder, 42);
  return cachedMediaByDay;
}

export function invalidateMediaCache() {
  cachedMediaList = null;
  cachedMediaByDay = null;
  cachedSource = null;
}

export async function getMediaForDay(
  day: number
): Promise<DayMedia | undefined> {
  if (day < 1 || day > 25) return undefined;

  const dayKey = String(day);
  const configMedia = MEDIA_CONFIG[dayKey];

  if (
    configMedia &&
    (configMedia.imageUrl || configMedia.videoUrl || configMedia.audioUrl)
  ) {
    return {
      imageUrl: configMedia.imageUrl || undefined,
      videoUrl: configMedia.videoUrl || undefined,
      audioUrl: configMedia.audioUrl || undefined,
    };
  }

  const mapping = await buildMediaMapping();
  return mapping[day - 1];
}

export async function getAllMediaDays(): Promise<(DayMedia | undefined)[]> {
  return buildMediaMapping();
}

export default {
  getMediaForDay,
  getAllMediaDays,
  invalidateMediaCache,
};
