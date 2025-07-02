import { LeagueIcon } from "@/components/LeagueIcon";

export default async function Home() {
  return (
    <div className="grid text-primary grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-base-content text-4xl font-bold">
        Welcome to the Next.js App
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        <LeagueIcon league="ohm" />
        <LeagueIcon league="ampere" />
        <LeagueIcon league="volt" />
        <LeagueIcon league="joule" />
        <LeagueIcon league="tesla" />
        <LeagueIcon league="photon" />
      </div>

    </div>

  );
}
