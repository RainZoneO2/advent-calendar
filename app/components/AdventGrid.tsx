import { AdventCard } from "~/components";
import { getMediaForDay } from "~/utils/mediaHelper";

type AdventGridProps = {
  currentDate: Date;
  activeCard: number | null;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  darkMode?: boolean;
};

export default function AdventGrid({
  currentDate,
  activeCard,
  setActiveCard,
  darkMode = false,
}: AdventGridProps) {
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section
      className={`relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4 rounded-xl shadow-md transition-colors duration-300 ${
        darkMode
          ? "bg-linear-to-b from-gray-800 via-gray-900 to-gray-800"
          : "bg-linear-to-b from-white to-gray-50"
      }`}
    >
      <div
        className={`absolute top-3 right-3 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-2 shadow-md border text-sm md:text-base transition-all duration-300 ${
          darkMode
            ? "bg-gray-800/80 border-gray-700 text-red-300"
            : "bg-white/80 border-red-100 text-gray-700"
        }`}
      >
        <div
          className={`text-xs font-semibold ${darkMode ? "text-red-300" : "text-advent-red"}`}
        >
          Today
        </div>
        <div
          className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          {formattedDate}
        </div>
        <div
          className={`font-bold mt-1 ${darkMode ? "text-green-300" : "text-advent-green"}`}
        >
          Day {currentDate.getDate()}
        </div>
      </div>
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
