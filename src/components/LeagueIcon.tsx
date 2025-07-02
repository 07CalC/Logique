import { LeagueType } from "@/types"
import Image from "next/image"



export const LeagueIcon = ({ league }: { league: LeagueType }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src={`/leagues/${league}.png`}
        alt={`${league} league icon`}
        width={245}
        height={245}
        className="rounded-full"
      />
      <span className="text-center text-xl font-semibold capitalize">{league}</span>
    </div>
  )
}
