import type { ReactNode } from "react";
import AdventMedia from "./AdventMedia";
import type { DayMedia } from "~/utils/mediaHelper";

type AdventCardProps = {
  title: string;
  day?: number;
  isUnlocked: boolean;
  isActive: boolean;
  onClick: () => void;
  children?: ReactNode;
  className?: string;
  media?: DayMedia;
};

export default function AdventCard({
  title,
  day,
  isUnlocked,
  isActive,
  onClick,
  children,
  className,
  media,
}: AdventCardProps) {
  const variant = isActive ? "overlay" : "grid";
  const baseClasses = "rounded-lg border transition-all duration-300";
  const variantClasses =
    variant === "grid"
      ? `p-4 shadow-sm ${
          isUnlocked
            ? "bg-white border-gray-200 hover:shadow-advent hover:border-red-200 cursor-pointer"
            : "bg-gray-100 border-gray-300 cursor-not-allowed"
        }`
      : `p-8 max-w-2xl w-full bg-white shadow-advent-lg border-2 border-red-200 rounded-2xl`;

  let cardContent;
  if (!isUnlocked) {
    cardContent = (
      <p className="text-sm text-gray-400 italic">Locked until day {day}</p>
    );
  } else if (isActive) {
    cardContent = <AdventMedia media={media} day={day} />;
  } else {
    cardContent = <div className="text-sm text-gray-700">{children}</div>;
  }

  return (
    <article
      className={`${baseClasses} ${variantClasses} ${className || ""}`}
      onClick={isUnlocked ? onClick : undefined}
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
      {cardContent}
    </article>
  );
}
