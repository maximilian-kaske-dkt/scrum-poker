"use client";

import { Button } from "@/components/ui/button";
import { StatusType } from "@/lib/schema";
import { useParams, useRouter } from "next/navigation";
import { statusAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to reset the values in the room?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await statusAction({ roomId: params.slug, status: "reset" });
                router.refresh();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
