
import { db } from "@/db/init";
import { leagues } from "@/db/schema";
import { eq } from "drizzle-orm";

const leagueData = [
  {
    name: "Ohm League",
    description: "Every journey begins here. Build your fundamentals and get in the game.",
    icon: "/leagues/ohm.png",
    minPoints: 0,
    maxPoints: 199,
  },
  {
    name: "Ampere League",
    description: "You’ve got current flowing! Stay consistent and level up your skills.",
    icon: "/leagues/ampere.png",
    minPoints: 200,
    maxPoints: 499,
  },
  {
    name: "Volt League",
    description: "You’re charged up and solving fast. A force to reckon with.",
    icon: "/leagues/volt.png",
    minPoints: 500,
    maxPoints: 999,
  },
  {
    name: "Joule League",
    description: "You’ve built energy and precision. Perform with power under pressure.",
    icon: "/leagues/joule.png",
    minPoints: 1000,
    maxPoints: 1499,
  },
  {
    name: "Tesla League",
    description: "Elite and efficient. You think beyond formulas — like a true innovator.",
    icon: "/leagues/tesla.png",
    minPoints: 1500,
    maxPoints: 1999,
  },
  {
    name: "Photon League",
    description: "Limitless speed, unmatched accuracy. You’re in the top 1%. Keep shining.",
    icon: "/leagues/photon.png",
    minPoints: 2000,
    maxPoints: 99999,
  },
];

async function seedLeagues() {
  for (const league of leagueData) {
    const exists = await db
      .select()
      .from(leagues)
      .where(eq(leagues.name, league.name));

    if (exists.length === 0) {
      await db.insert(leagues).values({
        name: league.name,
        description: league.description,
        icon: league.icon,
        minPoints: league.minPoints,
        maxPoints: league.maxPoints,
      });
      console.log(`✅ Inserted: ${league.name}`);
    } else {
      console.log(`⚠️  Already exists: ${league.name}`);
    }
  }
}

seedLeagues()
  .then(() => {
    console.log("🌱 League seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error seeding leagues:", err);
    process.exit(1);
  });
