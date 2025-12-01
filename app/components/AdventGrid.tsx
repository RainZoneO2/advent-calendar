import { AdventCard } from "~/components";
import { getMediaForDay } from "~/utils/mediaHelper";

type AdventGridProps = {
  currentDate: Date;
  activeCard: number | null;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function AdventGrid({
  currentDate,
  activeCard,
  setActiveCard,
}: AdventGridProps) {
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4 bg-linear-to-b from-white to-gray-50 rounded-xl shadow-md">
      {days
        .filter((day) => day !== activeCard)
        .map((day) => {
          const isUnlocked = currentDate.getDate() >= day;
          const isActive = activeCard === day;
          const media = getMediaForDay(day);
          const thumbnailUrl = media?.imageUrl;

          return (
            <AdventCard
              key={day}
              title={`Day ${day}`}
              day={day}
              isUnlocked={isUnlocked}
              isActive={isActive}
              onClick={() => setActiveCard(isActive ? null : day)}
              media={media}
            >
              {isUnlocked ? (
                <>
                  {media?.videoUrl && !thumbnailUrl ? (
                    <video
                      src={media.videoUrl}
                      poster={undefined}
                      className="w-full h-24 object-cover rounded mb-2 blur"
                      muted
                      playsInline
                      autoPlay
                      loop
                      preload="metadata"
                    />
                  ) : thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={`Day ${day}`}
                      className="w-full h-24 object-cover rounded mb-2 blur"
                      loading="lazy"
                    />
                  ) : null}
                  <p>Unlocked!</p>
                </>
              ) : undefined}
            </AdventCard>
          );
        })}
    </section>
  );
}
