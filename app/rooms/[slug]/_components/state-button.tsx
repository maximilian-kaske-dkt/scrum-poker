"use client";

import { Button } from "@/components/ui/button";
import { StatusType } from "@/lib/schema";
import { useParams, useRouter } from "next/navigation";
import { statusAction } from "./actions";

export function StateButton({ status }: { status: StatusType }) {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="flex-1"
        onClick={async () => {
          await statusAction({
            roomId: params.slug,
            status: status === "open" ? "hide" : "open",
          });
          router.refresh();
        }}
      >
        {status === "open" ? "Hide" : "Open"}
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={async () => {
          await statusAction({ roomId: params.slug, status: "reset" });
          router.refresh();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
