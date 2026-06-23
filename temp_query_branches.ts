import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const branches = await prisma.branch.findMany();
  console.log("DATABASE_BRANCHES_DUMP_START");
  console.log(JSON.stringify(branches, null, 2));
  console.log("DATABASE_BRANCHES_DUMP_END");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
