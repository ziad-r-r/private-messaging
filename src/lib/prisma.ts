import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

if (process.env.VERCEL) {
  process.env.DATABASE_URL = "file:/tmp/private.db";
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient; seeded?: boolean };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function ensureSeeded() {
  if (globalForPrisma.seeded) return;
  const count = await prisma.user.count();
  if (count > 0) {
    globalForPrisma.seeded = true;
    return;
  }
  const passwordHash = await bcrypt.hash("private123", 12);
  const privacy = JSON.stringify({
    messages: "everyone",
    friendRequests: "everyone",
    profilePhoto: "everyone",
    onlineStatus: "everyone",
    lastSeen: "everyone",
    readReceipts: true,
    typingIndicator: true
  });
  await prisma.user.createMany({
    data: [
      { username: "admin", privateId: "PRV-A1DM1N0", passwordHash, role: "admin", bio: "PRIVATE operations.", privacy },
      { username: "nova", privateId: "PRV-8F42K91", passwordHash, bio: "Building quiet rooms on the internet.", privacy },
      { username: "mira", privateId: "PRV-3K91LQ2", passwordHash, bio: "Designer. Replies slowly, on purpose.", privacy },
      { username: "karim", privateId: "PRV-7MN4C80", passwordHash, bio: "Night shifts and long voice notes.", privacy }
    ]
  });
  globalForPrisma.seeded = true;
}
