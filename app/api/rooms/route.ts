import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

// FIXME: redirect is BAD

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  // const uuid = await cookies().get('uuid');
  const userId = req.cookies.get("uuid")?.value;

  if (!userId) redirect("/");

  const roomId = crypto.randomUUID();

  await redis.hset(`rooms:${roomId}:votes`, { [userId]: null });
  await redis.set(`rooms:${roomId}:status`, "hide");

  return Response.json({ uuid: roomId });
}
