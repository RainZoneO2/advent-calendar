export type AdventImage = {
  src: string;
  filename: string;
};

export type DayMedia = {
  imageUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
};

// Try to load from user folder first, fallback to samples
const userModules = import.meta.glob(
  "../media/calendar/user/*.{png,jpg,jpeg,webp,mp4,webm,mp3,wav,ogg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

const samplesModules = import.meta.glob(
  "../media/calendar/samples/*.{png,jpg,jpeg,webp,mp4,webm,mp3,wav,ogg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

// Use user media if available, otherwise fall back to samples
const modules =
  Object.keys(userModules).length > 0 ? userModules : samplesModules;

const images: AdventImage[] = Object.keys(modules).map((path) => ({
  src: modules[path],
  filename: path.split("/").pop() || path,
}));

function shuffleArray<T>(arr: T[], rng: () => number = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

function buildMediaByDay(seed?: number) {
  const imageExt = new Set(["png", "jpg", "jpeg", "webp", "gif"]);
  const videoExt = new Set(["mp4", "webm", "mov"]);
  const audioExt = new Set(["mp3", "wav", "ogg"]);

  const pool: DayMedia[] = images.map((i) => {
    const parts = i.filename.split(".");
    const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : "";
    if (imageExt.has(ext)) return { imageUrl: i.src };
    if (videoExt.has(ext)) return { videoUrl: i.src };
    if (audioExt.has(ext)) return { audioUrl: i.src };

    return { imageUrl: i.src };
  });

  if (pool.length === 0)
    return Array.from({ length: 25 }, () => undefined as DayMedia | undefined);

  const shuffledPool =
    seed == null ? shuffleArray(pool) : shuffleArray(pool, mulberry32(seed));

  const byDay: (DayMedia | undefined)[] = Array.from({ length: 25 }, (_, i) => {
    return shuffledPool[i % shuffledPool.length];
  });

  return byDay;
}

const MEDIA_BY_DAY = buildMediaByDay(42);

import mediaConfigData from "../media-config.json";

const MEDIA_CONFIG: Record<string, DayMedia> = mediaConfigData;

export function getMediaForDay(day: number): DayMedia | undefined {
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

  const mapped = MEDIA_BY_DAY[day - 1];
  return mapped || undefined;
}

export function getAllImages() {
  return MEDIA_BY_DAY.map((m) => (m && m.imageUrl ? m.imageUrl : undefined));
}

export function createShuffledMapping(seed?: number) {
  return buildMediaByDay(seed);
}

export default {
  getMediaForDay,
  getAllImages,
  createShuffledMapping,
  MEDIA_BY_DAY,
};
