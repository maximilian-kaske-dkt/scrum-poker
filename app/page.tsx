"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl">Scrum Poker</h1>
      <p className="text-muted-foreground text-lg">
        A simple Next.js example for the Decathlon Team!
      </p>
      <div>
        <Button
          onClick={async () => {
            // TODO: use server actions
            const res = await fetch("/api/rooms", { method: "POST" });
            const json = (await res.json()) as { uuid: string };
            router.push(`/rooms/${json.uuid}`);
          }}
        >
          Create a Room
        </Button>
      </div>
    </div>
  );
}
