import { PrismaClient } from "@prisma/client";

// Import this single instance of prisma and re-use across the application
// The prisma object is cached the first time it is created
let prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 1000,
    timeout: 20000,
  },
});

export default prisma;
