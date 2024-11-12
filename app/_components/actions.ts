"use server";

import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const redis = Redis.fromEnv();
const p = redis.pipeline();

export async function createAction() {
  const userId = (await cookies()).get("uuid")?.value;

  if (!userId) return;

  const roomId = crypto.randomUUID();

  p.hset(`rooms:${roomId}:votes`, { [userId]: null });
  p.set(`rooms:${roomId}:status`, "hide");
  p.incr(`rooms`);

  await p.exec();

  redirect(`/rooms/${roomId}`);

  return;
}
