"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const POLLING_INTERVAL = 5_000;

export function PollResult() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(router.refresh, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [router]);

  return null;
}
