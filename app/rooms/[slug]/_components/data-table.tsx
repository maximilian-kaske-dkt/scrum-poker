import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RoomType } from "@/lib/schema";
import Image from "next/image";

export function DataTable({ room }: { room: RoomType }) {
  return (
    <div>
      <Table>
        <TableCaption>A list all votes within the room.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[300px]">ID</TableHead>
            <TableHead className="text-right">Vote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(room)
            .sort()
            .map((key) => (
              <TableRow key={key}>
                <TableCell className="font-medium font-mono flex items-center gap-2">
                  <Image
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${key}`}
                    alt={key}
                    width={20}
                    height={20}
                  />
                  {key}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {room[key] || "-"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
