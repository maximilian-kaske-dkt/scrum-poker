import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export function Subscribe({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  async function submit(formData: FormData) {
    "use server";
    const roomId = formData.get("roomId") as string;
    // REMINDER: use redis.hset or fetch
    await fetch(`${BASE_URL}/api/rooms/${roomId}`, {
      method: "PUT",
      headers: {
        cookie: `uuid=${userId}`,
      },
      body: JSON.stringify(null),
    });
    redirect(`/rooms/${roomId}`);
  }

  return (
    <form action={submit}>
      <input type="hidden" name="roomId" value={roomId} />
      <Button>Subscribe to Room</Button>
    </form>
  );
}
