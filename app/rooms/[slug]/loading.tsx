import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS = 3;

export default function Loading() {
  return (
    <div className="grid gap-8">
      <div className="flex items-center gap-4 flex-wrap">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
      <Separator />
      <Table>
        <TableCaption>
          <Skeleton className="h-5 w-48" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[300px]">ID</TableHead>
            <TableHead className="text-right">Vote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(ROWS).fill(undefined).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-64" />
              </TableCell>
              <TableCell className="">
                <Skeleton className="h-5 w-5 place-self-end" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Separator />
      <div className="flex items-center justify-center">
        <Skeleton className="h-6 w-56" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
