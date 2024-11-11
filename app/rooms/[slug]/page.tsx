import { cookies } from "next/headers";
import { DataTable } from "./_components/data-table";
import { roomSchema, statusSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import { Subscribe } from "./_components/subscribe";
import { BASE_URL } from "@/lib/constants";
import { VoteButton } from "./_components/vote-button";
import { StateButton } from "./_components/state-button";
import { PollResult } from "./_components/poll-result";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const cookieStore = await cookies();
  const slug = (await params).slug;
  const uuid = cookieStore.get("uuid")?.value;

  // REMINDER: server-side (nodejs) fetch doesn't include cookies automatically!
  // REMINDER: url requires to be absolute as server doesn't know about host
  // REMINDER: or just query redis.hgetall() to access the data
  const res1 = await fetch(`${BASE_URL}/api/rooms/${slug}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  const json1 = await res1.json();
  const room = roomSchema.safeParse(json1);

  if (!room.success || !uuid) return notFound();

  console.log(room.data, uuid);

  if (!uuid || room.data?.[uuid] === undefined) {
    return <Subscribe roomId={slug} userId={uuid} />;
  }

  const res2 = await fetch(`${BASE_URL}/api/rooms/${slug}/status`);
  const json2 = await res2.json();
  const status = statusSchema.safeParse(json2);

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
    <div className="grid gap-4">
      <VoteButton defaultValue={room.data[uuid] || null} />
      <DataTable room={room.data} />
      <StateButton status={status.data} />
      {/* <PollResult /> */}
    </div>
  );
}
