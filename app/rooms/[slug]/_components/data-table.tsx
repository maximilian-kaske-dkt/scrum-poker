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
                <TableCell className="font-medium font-mono">{key}</TableCell>
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
