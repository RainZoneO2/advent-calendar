import { useState } from "react";
import type { Route } from "./+types/home";
import { AdventCard, AdventGrid } from "~/components";
import { getMediaForDay } from "~/utils/mediaHelper";

export function loader() {
  return { currentDate: new Date() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const activeMedia = activeCard ? getMediaForDay(activeCard) : undefined;
  const currentDate = loaderData.currentDate;
  const currentDay = currentDate.getDate();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-red-50 via-white to-green-50 p-4 md:p-8">
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md border border-red-100">
        <div className="text-xs font-semibold text-advent-red">Today</div>
        <div className="text-sm font-medium text-gray-700">{formattedDate}</div>
        <div className="text-lg font-bold text-advent-green mt-1">
          Day {currentDay}
        </div>
      </div>
      <div className="text-center mb-8 animate-float">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-advent-red drop-shadow-lg">
          🎄 Advent Calendar 🎄
        </h1>
        <p className="text-gray-600 text-lg">December 1-25</p>
      </div>
      <div className="w-full max-w-5xl">
        <AdventGrid
          currentDate={loaderData.currentDate}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      </div>
      {activeCard && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="animate-in scale-in duration-300">
            <AdventCard
              title={`Day ${activeCard}`}
              day={activeCard}
              isUnlocked={true}
              isActive={true}
              onClick={() => setActiveCard(null)}
              media={activeMedia}
            ></AdventCard>
          </div>
        </div>
      )}
    </main>
  );
}
