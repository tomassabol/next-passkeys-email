import redis from "~/server/redis";
import { decryptText, encryptText } from "./encrypt";
import { env } from "~/env.mjs";

if (!process.env.NEXTAUTH_URL && !process.env.VERCEL_URL) {
  throw new Error("NEXTAUTH_URL is not set");
}

export const rpID = env.RP_ID;
// process.env.NEXTAUTH_URL?.replace("https://", "") ??
// process.env.VERCEL_URL ??
// "";

// export const domain = `https://${rpID}`;
export const domain = env.NEXTAUTH_URL;

export async function saveChallenge({
  userID,
  challenge,
}: {
  challenge: string;
  userID: string;
}) {
  const cryptChallenge = encryptText(challenge);
  await redis.set(`${rpID}-${userID}-challenge`, cryptChallenge, {
    ex: 60 * 5,
  });
}

export async function getChallenge(userID: string): Promise<string | null> {
  const cryptChallenge = await redis.get<string | null>(
    `${rpID}-${userID}-challenge`,
  );
  if (!cryptChallenge) {
    return null;
  }
  await redis.del(`${rpID}-${userID}-challenge`);
  return decryptText(cryptChallenge);
}
