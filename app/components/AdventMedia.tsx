import type { DayMedia } from "~/utils/mediaHelper";

type AdventMediaProps = {
  media?: DayMedia;
  day?: number;
};

export default function AdventMedia({ media, day }: AdventMediaProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {media?.videoUrl && (
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <video
            src={media.videoUrl}
            controls
            className="w-full max-h-96 bg-black"
          />
        </div>
      )}
      {media?.imageUrl && !media.videoUrl && (
        <img
          src={media.imageUrl}
          alt={`Day ${day}`}
          className="w-full max-h-96 object-contain rounded-lg shadow-lg"
        />
      )}
      {media?.audioUrl && (
        <div className="w-full">
          <audio src={media.audioUrl} controls className="w-full rounded-lg" />
        </div>
      )}
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full bg-advent-red text-white flex items-center justify-center font-bold text-sm">
          {day}
        </div>
        <p className="text-sm font-medium text-gray-700">December {day}</p>
      </div>
    </div>
  );
}
