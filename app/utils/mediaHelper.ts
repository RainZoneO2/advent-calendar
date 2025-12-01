export type AdventImage = {
  src: string;
  filename: string;
};

export type DayMedia = {
  imageUrl?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
};

const modules = import.meta.glob(
  "/app/media/calendar/*.{png,jpg,jpeg,webp,mp4,webm,mp3,wav,ogg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>;

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

function buildImagesByDay(seed?: number) {
  const srcs = images.map((i) => i.src);
  const shuffled =
    seed == null ? shuffleArray(srcs) : shuffleArray(srcs, mulberry32(seed));

  const byDay: string[] = Array.from(
    { length: 25 },
    (_, i) => shuffled[i % shuffled.length]
  );

  return byDay;
}

const IMAGES_BY_DAY = buildImagesByDay(42);

// Load media config (optional manual overrides for images/video/audio)
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

  const shuffledImage = IMAGES_BY_DAY[day - 1];
  return shuffledImage ? { imageUrl: shuffledImage } : undefined;
}

export function getAllImages() {
  return IMAGES_BY_DAY.slice();
}

export function createShuffledMapping(seed?: number) {
  return buildImagesByDay(seed);
}

export default {
  getMediaForDay,
  getAllImages,
  createShuffledMapping,
  IMAGES_BY_DAY,
};
