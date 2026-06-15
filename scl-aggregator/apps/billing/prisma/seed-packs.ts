import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CREDIT_PACKS = [
  { name: "starter", credits: 85000, priceInr: 850, priceUsd: 10 },
  { name: "growth", credits: 420000, priceInr: 4200, priceUsd: 50 },
  { name: "scale", credits: 850000, priceInr: 8500, priceUsd: 100 },
  { name: "enterprise", credits: 4200000, priceInr: 42000, priceUsd: 500 },
];

async function main() {
  console.log("Seeding credit packs...");

  for (const pack of CREDIT_PACKS) {
    const upserted = await prisma.creditPack.upsert({
      where: { name: pack.name },
      update: {
        credits: pack.credits,
        priceInr: pack.priceInr,
        priceUsd: pack.priceUsd,
      },
      create: {
        name: pack.name,
        credits: pack.credits,
        priceInr: pack.priceInr,
        priceUsd: pack.priceUsd,
      },
    });
    console.log(`- ${upserted.name}: ${upserted.credits} credits for ₹${upserted.priceInr} / $${upserted.priceUsd}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
