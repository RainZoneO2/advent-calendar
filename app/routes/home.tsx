import { useState } from "react";
import type { Route } from "./+types/home";
import { AdventCard, AdventGrid } from "~/components";
import { getImageForDay } from "~/utils/adventImages";

export function loader() {
  return { currentDate: new Date() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const activeImageUrl = activeCard ? getImageForDay(activeCard) : undefined;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Advent Calendar</h1>
      <AdventGrid
        currentDate={loaderData.currentDate}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      {activeCard && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm p-4">
          <AdventCard
            title={`Day ${activeCard}`}
            day={activeCard}
            isUnlocked={true}
            isActive={true}
            onClick={() => setActiveCard(null)}
            imageUrl={activeImageUrl}
          ></AdventCard>
        </div>
      )}
    </main>
  );
}
