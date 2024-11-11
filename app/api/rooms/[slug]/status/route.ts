import { statusSchema } from "@/lib/schema";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const redis = Redis.fromEnv();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const status = await redis.get(`rooms:${slug}:status`);

  return Response.json(status);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const json = await req.json();

  const status = statusSchema.safeParse(json);

  if (!status.success) {
    return Response.json(status.error.toString(), { status: 400 });
  }

  const res = await redis.set(`rooms:${slug}:status`, status.data);

  if (status.data === "reset") {
    const keys = await redis.hkeys(`rooms:${slug}:votes`);
    const room = Object.fromEntries(keys.map((key) => [key, null]));
    await redis.hset(`rooms:${slug}:votes`, room);
  }

  return Response.json(res);
}
