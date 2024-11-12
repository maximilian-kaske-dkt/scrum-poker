import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const uuid = (await cookies()).get("uuid")?.value;
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <header className="mx-auto container mt-4 p-1 font-medium">
        Scrum Poker <span className="text-[#3643ba] font-bold">DKT</span>
      </header>
      <Separator />
      <main className="mx-auto container flex-1 p-1">{children}</main>
      <Separator />
      <footer className="mx-auto container grid gap-1 p-1 mb-4">
        <p className="text-sm font-mono text-muted-foreground">
          ROOM ID: {slug}
        </p>
        <p className="text-sm font-mono text-muted-foreground">
          User ID: {uuid}
        </p>
      </footer>
    </div>
  );
}
