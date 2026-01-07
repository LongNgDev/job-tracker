import { Table, TableHead, TableHeader } from "@/components/ui/table";
import React from "react";

function JobTable() {
  return (
    <div className="w-full p-4">
      <Table className="">
        <TableHeader>
          <TableHead>Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Published At</TableHead>
          <TableHead>Expired At</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Job Type</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Salary Min</TableHead>
          <TableHead>Salary Max</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Notes</TableHead>
        </TableHeader>
      </Table>
    </div>
  );
}

export default JobTable;
