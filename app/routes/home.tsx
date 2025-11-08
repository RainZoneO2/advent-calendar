import type { Route } from "./+types/home";
import { AdventGrid } from "~/components";

export function loader() {
  return { currentDate: new Date() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Advent Calendar</h1>
      <AdventGrid currentDate={loaderData.currentDate} />
    </main>
  );
}
