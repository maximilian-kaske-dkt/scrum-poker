import { z } from "zod";

// Record<string, number | null>
export const roomSchema = z.record(z.coerce.number().nullable());

export type RoomType = z.infer<typeof roomSchema>;

// rename 'open' to 'show'
export const statusSchema = z.enum(["hide", "open", "reset"]);

export type StatusType = z.infer<typeof statusSchema>;
