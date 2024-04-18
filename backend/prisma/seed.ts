import { PrismaClient } from "@prisma/client";
import { load } from "./seedFunctions";

const prisma = new PrismaClient();
load(prisma);
