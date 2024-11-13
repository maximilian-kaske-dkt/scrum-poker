import { cookies } from "next/headers";
import { DataTable } from "./_components/data-table";
import { roomSchema, statusSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import { JoinButton } from "./_components/join-button";
import { VoteButton } from "./_components/vote-button";
import { StateButton } from "./_components/state-button";
import { PollResult } from "./_components/poll-result";
import { Separator } from "@/components/ui/separator";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const cookieStore = await cookies();
  const slug = (await params).slug;
  const uuid = cookieStore.get("uuid")?.value;

  const roomData = await redis.hgetall(`rooms:${slug}:votes`);
  const room = roomSchema.safeParse(roomData);

  if (!room.success || !uuid) return notFound();

  console.log(room.data, uuid);

  if (!uuid || room.data?.[uuid] === undefined) {
    return (
      <div className="flex items-center justify-center">
        <JoinButton roomId={slug} userId={uuid} />
      </div>
    );
  }

  const statusData = await redis.get(`rooms:${slug}:status`);
  const status = statusSchema.safeParse(statusData);

  if (!status.success) return notFound();

  // HIDE ON SERVER SO NO CHEAT!
  if (status.data !== "open") {
    Object.keys(room.data).forEach((key) => {
      if (key !== uuid) {
        room.data[key] = null;
      }
    });
  }

  return (
    <div className="grid gap-8">
      <VoteButton defaultValue={room.data[uuid] || null} />
      <Separator />
      <DataTable room={room.data} />
      <Separator />
      <p className="text-center">
        Current state is{" "}
        <span className="font-mono">&apos;{status.data}&apos;</span>
      </p>
      <StateButton status={status.data} />
      {/* <PollResult /> */}
    </div>
  );
}
