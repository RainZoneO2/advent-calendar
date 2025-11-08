import { AdventCard } from "~/components";

type AdventGridProps = {
  currentDate: Date;
};

export default function AdventGrid({ currentDate }: AdventGridProps) {
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4">
      {days.map((day) => {
        const isUnlocked = currentDate.getDate() >= day;

        return (
          <AdventCard
            key={day}
            title={`Day ${day}`}
            day={day}
            isUnlocked={isUnlocked}
          >
            {isUnlocked ? (
              <p> Unlocked day {day}!</p>
            ) : (
              <p> Locked until day {day}</p>
            )}
          </AdventCard>
        );
      })}
    </section>
  );
}
