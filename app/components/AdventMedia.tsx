type AdventMediaProps = {
  imageUrl?: string;
  day?: number;
};

export default function AdventMedia({ imageUrl, day }: AdventMediaProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Day ${day}`}
          className="w-full max-h-96 object-contain rounded"
        />
      )}
      <p className="text-sm text-gray-600">Day {day}</p>
    </div>
  );
}
