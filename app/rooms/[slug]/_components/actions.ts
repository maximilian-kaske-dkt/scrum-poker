"use server";

import { StatusType } from "@/lib/schema";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const redis = Redis.fromEnv();

export async function voteAction({
  roomId,
  value,
}: {
  roomId: string;
  value: number;
}) {
  const userId = (await cookies()).get("uuid")?.value;
  if (!userId) return;

  await redis.hset(`rooms:${roomId}:votes`, { [userId]: value });
}

export async function statusAction({
  status,
  roomId,
}: {
  status: StatusType;
  roomId: string;
}) {
  await redis.set(`rooms:${roomId}:status`, status);

  if (status === "reset") {
    const keys = await redis.hkeys(`rooms:${roomId}:votes`);
    const room = Object.fromEntries(keys.map((key) => [key, null]));
    await redis.hset(`rooms:${roomId}:votes`, room);
  }
}
