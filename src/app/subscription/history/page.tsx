import { Link } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function HistoryPage() {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Tokens</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="max-w-[400px] overflow-hidden truncate font-medium">
              5752AA05-0001
            </TableCell>
            <TableCell>PAID</TableCell>
            <TableCell className="capitalize">$5.00</TableCell>
            <TableCell className="capitalize">200 Tokens</TableCell>
            <TableCell>Dec 31, 2023, 12:52 PM</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
