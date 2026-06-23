import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rates = await prisma.interestRate.findMany();
  console.log("DATABASE_RATES_DUMP_START");
  console.log(JSON.stringify(rates, null, 2));
  console.log("DATABASE_RATES_DUMP_END");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
