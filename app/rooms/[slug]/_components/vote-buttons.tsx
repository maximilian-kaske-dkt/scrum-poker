"use client";

import { Button } from "@/components/ui/button";
import { RoomType } from "@/lib/schema";
import { useParams, useRouter } from "next/navigation";
import { voteAction } from "./actions";

const votes = [1, 2, 3, 4, 5];

export function VoteButtons({
  defaultValue,
}: {
  defaultValue: RoomType[keyof RoomType]; // number | null
  // roomId: string;
}) {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {votes.map((value) => (
        <Button
          key={value}
          variant={defaultValue === value ? "default" : "outline"}
          className="font-mono flex-1 font-bold"
          onClick={async () => {
            await voteAction({ roomId: params.slug, value });
            router.refresh();
            // TODO: revalidatePath()
          }}
        >
          {value}
        </Button>
      ))}
    </div>
  );
}
