"use client";

import { Button } from "@/components/ui/button";
import { createAction } from "./actions";

export function CreateButton() {
  return <Button onClick={createAction}>Create a room</Button>;
}
