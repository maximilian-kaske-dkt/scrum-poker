import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";

const redis = Redis.fromEnv();

export function JoinButton({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  async function submit(formData: FormData) {
    "use server";
    const roomId = formData.get("roomId") as string;
    await redis.hset(`rooms:${roomId}:votes`, { [userId]: null });
    redirect(`/rooms/${roomId}`);
  }

  return (
    <form action={submit}>
      <input type="hidden" name="roomId" value={roomId} />
      <Button>Join room</Button>
    </form>
  );
}
