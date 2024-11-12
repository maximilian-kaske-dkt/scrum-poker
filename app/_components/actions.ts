"use server";

import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const redis = Redis.fromEnv();

export async function createAction() {
  const userId = (await cookies()).get("uuid")?.value;

  if (!userId) return;

  const roomId = crypto.randomUUID();

  await redis.hset(`rooms:${roomId}:votes`, { [userId]: null });
  await redis.set(`rooms:${roomId}:status`, "hide");

  return roomId;
}
