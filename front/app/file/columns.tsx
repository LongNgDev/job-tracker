"use client";

import { ColumnDef } from "@tanstack/react-table";

type FileStorage = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded_at: string;
};

export const columns = ({}): ColumnDef<FileStorage>[] => [
  {
    accessorKey: "name",
    header: "File Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "uploaded_at",
    header: "Uploaded",
  },
];
