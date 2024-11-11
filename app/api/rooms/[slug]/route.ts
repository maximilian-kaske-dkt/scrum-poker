import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const redis = Redis.fromEnv();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const roomId = (await params).slug;
  const userId = req.cookies.get("uuid")?.value;

  console.log({ roomId, userId });

  if (!userId || !roomId) redirect("/");

  const room = await redis.hgetall(`rooms:${roomId}:votes`);
  // REMINDER: we could validate the schema

  if (room === null) redirect("/");

  return Response.json(room);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const roomId = (await params).slug;
  const userId = req.cookies.get("uuid")?.value;

  const json = await req.json();

  if (!userId) redirect("/");

  const res = await redis.hset(`rooms:${roomId}:votes`, { [userId]: json });

  return Response.json(res);
}
