import { createHash, randomBytes, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export const COOKIE = "private_session";
const SESSION_DAYS = 14;

export const DEFAULT_PRIVACY = {
  messages: "everyone",
  friendRequests: "everyone",
  profilePhoto: "everyone",
  onlineStatus: "everyone",
  lastSeen: "everyone",
  readReceipts: true,
  typingIndicator: true
} as const;

export type Privacy = {
  messages: "everyone" | "friends" | "nobody";
  friendRequests: "everyone" | "nobody";
  profilePhoto: "everyone" | "friends" | "nobody";
  onlineStatus: "everyone" | "friends" | "nobody";
  lastSeen: "everyone" | "friends" | "nobody";
  readReceipts: boolean;
  typingIndicator: boolean;
};

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function makePrivateId() {
  const bytes = randomBytes(7);
  let id = "PRV-";
  for (let i = 0; i < 7; i++) id += ID_ALPHABET[bytes[i] % ID_ALPHABET.length];
  return id;
}

export function parsePrivacy(raw: string | null | undefined): Privacy {
  try {
    return { ...DEFAULT_PRIVACY, ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    return { ...DEFAULT_PRIVACY };
  }
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: { userId, tokenHash: hashToken(token), expiresAt }
  });
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60
  });
  return token;
}

export function clearSessionCookie() {
  cookies().set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getSessionUser() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true }
  });
  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  if (session.user.status !== "active") return null;
  return session.user;
}

export function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

const hits = new Map<string, { n: number; reset: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || row.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  if (row.n >= limit) return false;
  row.n += 1;
  return true;
}
