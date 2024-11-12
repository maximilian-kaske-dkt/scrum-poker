"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createAction } from "./_components/actions";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="font-bold text-3xl">
        Scrum Poker <span className="text-[#3643ba] font-bold">DKT</span>
      </h1>
      <p className="text-muted-foreground text-lg">
        A simple Next.js example for the Decathlon Team!
      </p>
      <div>
        <Button
          onClick={async () => {
            const roomId = await createAction();
            router.push(`/rooms/${roomId}`);
          }}
        >
          Create a Room
        </Button>
      </div>
    </div>
  );
}
