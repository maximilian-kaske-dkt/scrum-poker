"use client";

import { Button } from "@/components/ui/button";
import { StatusType } from "@/lib/schema";
import { useParams, useRouter } from "next/navigation";
import { statusAction } from "./actions";
import { useToast } from "@/hooks/use-toast";

export function ActionButtons({ status }: { status: StatusType }) {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center gap-4">
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
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => {
          const href = window.location.href;
          navigator.clipboard.writeText(href);
          toast({
            title: "Copied URL!",
            description: "Share it with your team mates",
          });
        }}
      >
        Copy URL to clipboard
      </Button>
    </div>
  );
}
