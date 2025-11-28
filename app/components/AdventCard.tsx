import type { ReactNode } from "react";
import AdventMedia from "./AdventMedia";

type AdventCardProps = {
  title: string;
  day?: number;
  isUnlocked: boolean;
  isActive: boolean;
  onClick: () => void;
  children?: ReactNode;
  className?: string;
  imageUrl?: string;
};

export default function AdventCard({
  title,
  day,
  isUnlocked,
  isActive,
  onClick,
  children,
  className,
  imageUrl,
}: AdventCardProps) {
  const variant = isActive ? "overlay" : "grid";
  const baseClasses = "rounded-lg border transition";
  const variantClasses =
    variant === "grid"
      ? `p-4 shadow-sm ${
          isUnlocked
            ? "bg-white hover:shadow-md cursor-pointer"
            : "bg-gray-100 opacity-60 cursor-not-allowed"
        }`
      : `p-8 max-w-lg w-full bg-white shadow-2x1 cursor-pointer rounded-2x1`;

  let cardContent;
  if (!isUnlocked) {
    cardContent = (
      <p className="text-sm text-gray-400 italic">Locked until day {day}</p>
    );
  } else if (isActive) {
    cardContent = <AdventMedia imageUrl={imageUrl} day={day} />;
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
