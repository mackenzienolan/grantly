import { scrypt, randomBytes, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex"); // Generate a random 16-byte salt
  const keyLength = 64; // Recommended length for security

  // Hash the password using scrypt
  const hash = await scryptAsync(password, salt, keyLength);
  if (hash instanceof Buffer) {
    return `${salt}:${hash.toString("hex")}`;
  }
  throw new Error("Failed to hash data");
}

export async function verifyPassword(password: string, hash: string) {
  const [salt, key] = hash.split(":");
  const keyLength = 64;
  const hashedBuffer = await scryptAsync(password, salt, keyLength);

  if (hashedBuffer instanceof Buffer) {
    return timingSafeEqual(Buffer.from(key, "hex"), hashedBuffer);
  }
  throw new Error("Failed to verify hash");
}

export function hashKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export function verifyKey(key: string, hash: string) {
  return timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(hashKey(key), "hex")
  );
}
