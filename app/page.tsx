import { Redis } from "@upstash/redis";
import { CreateButton } from "./_components/create-button";

const redis = Redis.fromEnv();

export const revalidate = 600;

export default async function Home() {
  const number = await redis.get<number>(`rooms`);
  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="font-bold text-3xl">
        Scrum Poker <span className="text-[#3643ba] font-bold">DKT</span>
      </h1>
      <p className="text-muted-foreground text-lg">
        A simple Next.js example for the Decathlon Team!
      </p>
      <div>
        <CreateButton />
      </div>
      <p className="text-muted-foreground text-sm">
        <span className="text-foreground font-mono">{number}</span> rooms
        created
      </p>
    </div>
  );
}
