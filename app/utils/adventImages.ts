export type AdventImage = {
  src: string;
  filename: string;
};

const modules = import.meta.glob("/app/media/calendar/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

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

export function getImageForDay(day: number) {
  if (day < 1 || day > 25) return undefined;
  return IMAGES_BY_DAY[day - 1];
}

export function getAllImages() {
  return IMAGES_BY_DAY.slice();
}

export function createShuffledMapping(seed?: number) {
  return buildImagesByDay(seed);
}

export default {
  getImageForDay,
  getAllImages,
  createShuffledMapping,
  IMAGES_BY_DAY,
};
