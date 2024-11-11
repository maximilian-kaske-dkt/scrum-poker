"use client";

import { useParams } from "next/navigation";
import React from "react";

export function Client() {
  const params = useParams();

  React.useEffect(() => {
    if (params.slug) {
      fetch(`/api/rooms/${params.slug}`);
    }
  }, [params]);

  return null;
}
