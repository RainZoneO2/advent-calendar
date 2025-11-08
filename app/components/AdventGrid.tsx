import { AdventCard } from "~/components";

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
    <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 p-1">
      {days
        .filter((day) => day !== activeCard)
        .map((day) => {
          const isUnlocked = currentDate.getDate() >= day;
          const isActive = activeCard === day;

          return (
            <AdventCard
              key={day}
              title={`Day ${day}`}
              day={day}
              isUnlocked={isUnlocked}
              isActive={isActive}
              onClick={() => setActiveCard(isActive ? null : day)}
            >
              {isUnlocked ? <p> Unlocked!</p> : undefined}
            </AdventCard>
          );
        })}
    </section>
  );
}
