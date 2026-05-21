import { PrismaClient } from './src/generated/prisma';
const p = new PrismaClient();
console.log(Object.keys(p));
