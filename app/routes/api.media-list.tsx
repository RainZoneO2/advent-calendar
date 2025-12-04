import type { Route } from "./+types/api.media-list";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

export async function loader(): Promise<Response> {
  const mediaExt = new Set([
    "png",
    "jpg",
    "jpeg",
    "webp",
    "gif",
    "mp4",
    "webm",
    "mov",
    "mp3",
    "wav",
    "ogg",
  ]);

  try {
    const publicPath = join(process.cwd(), "public", "media", "calendar");
    const userDir = join(publicPath, "user");
    const samplesDir = join(publicPath, "samples");

    let files: string[] = [];
    let source = "samples";

    if (existsSync(userDir)) {
      files = readdirSync(userDir)
        .filter((f) => {
          const ext = f.split(".").pop()?.toLowerCase();
          return ext && mediaExt.has(ext);
        })
        .sort();

      if (files.length > 0) {
        source = "user";
      }
    }

    if (files.length === 0 && existsSync(samplesDir)) {
      files = readdirSync(samplesDir)
        .filter((f) => {
          const ext = f.split(".").pop()?.toLowerCase();
          return ext && mediaExt.has(ext);
        })
        .sort();
    }

    return Response.json(
      { files, source },
      { headers: { "Cache-Control": "max-age=10" } }
    );
  } catch (err) {
    console.error("Failed to read media directory:", err);
    return Response.json({ files: [] }, { status: 500 });
  }
}
