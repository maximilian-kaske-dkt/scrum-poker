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
    <div className="min-h-screen flex flex-col">
      <main className="mx-auto container flex-1 p-1">{children}</main>
      <footer className="mx-auto container grid gap-1 p-1">
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
