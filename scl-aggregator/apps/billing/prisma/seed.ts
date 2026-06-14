import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CREDIT_PACKS = [
  { name: "starter",    credits: 1_000,  priceUsd: 10,  priceInr: 850   },
  { name: "builder",    credits: 5_000,  priceUsd: 50,  priceInr: 4_200 },
  { name: "pro",        credits: 10_000, priceUsd: 100, priceInr: 8_500 },
  { name: "enterprise", credits: 50_000, priceUsd: 500, priceInr: 42_000 },
];

async function main() {
  console.log("Seeding credit packs...");

  for (const pack of CREDIT_PACKS) {
    await prisma.creditPack.upsert({
      where: { name: pack.name },
      update: {
        credits: pack.credits,
        priceUsd: pack.priceUsd,
        priceInr: pack.priceInr,
      },
      create: pack,
    });
    console.log(`  ✓ ${pack.name}: ${pack.credits} credits ($${pack.priceUsd} / ₹${pack.priceInr})`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
