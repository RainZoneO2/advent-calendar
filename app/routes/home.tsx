import { useState } from "react";
import type { Route } from "./+types/home";
import { AdventCard, AdventGrid } from "~/components";
import { getMediaForDay } from "~/utils/mediaHelper";
import type { LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const testDate = url.searchParams.get("date");
  const currentDate = testDate ? new Date(testDate) : new Date();
  return { currentDate };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const activeMedia = activeCard ? getMediaForDay(activeCard) : undefined;

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center transition-colors duration-300 p-4 md:p-8 ${
        darkMode
          ? "bg-linear-to-b from-gray-900 via-gray-800 to-gray-900"
          : "bg-linear-to-b from-red-50 via-white to-green-50"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 left-4 p-2 rounded-lg transition-all duration-300 ${
          darkMode
            ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        title="Toggle dark mode"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>

      <div className="text-center mb-8 animate-float">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg transition-colors duration-300 ${
            darkMode ? "text-red-400" : "text-advent-red"
          }`}
        >
          🎄 Advent Calendar 🎄
        </h1>
        <p
          className={`text-lg transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          December 1-25
        </p>
      </div>
      <div className="w-full max-w-5xl">
        <AdventGrid
          currentDate={loaderData.currentDate}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          darkMode={darkMode}
        />
      </div>
      {activeCard && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200 ${
            darkMode ? "bg-black/60" : "bg-black/50"
          }`}
        >
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
