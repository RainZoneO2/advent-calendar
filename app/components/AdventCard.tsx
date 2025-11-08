import type { ReactNode } from "react";

type AdventCardProps = {
  title: string;
  day?: number;
  isUnlocked: boolean;
  children?: ReactNode;
};

export default function AdventCard({
  title,
  day,
  isUnlocked,
  children,
}: AdventCardProps) {
  return (
    <article
      className={`p-4 rounded-lg shadow-sm border transition-all ${
        isUnlocked
          ? "bg-white hover:shadow-md cursor-pointer"
          : "bg-gray-100 opacity-60 cursor-not-allowed"
      }`}
    >
      <header className="flex items-baseline justify-between mb-2">
        <h2
          className={`text-lg font-semibold ${
            isUnlocked ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {title}
        </h2>
      </header>
      {isUnlocked ? (
        <div className="text-sm text-gray-700">{children}</div>
      ) : (
        <p className="text-sm text-gray-400 italic">Locked until day {day}</p>
      )}
    </article>
  );
}
