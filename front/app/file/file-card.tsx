import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

function FileCard() {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;

    if (!selected) return;

    if (selected.size > MAX_BYTES) {
      e.currentTarget.value = "";
      return;
    }
    setFile(selected);

    console.log("Picked file:", selected);
  };

  const onUpload = () => {
    if (!file) return;
    console.log("Ready to upload:", file.name, file.size, file.type);
    // later → FormData + fetch
  };

  return (
    <Card>
      <CardHeader className="flex">
        <div>Searchbar</div>
        <div>Sort</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Field>
              {/* <FieldLabel>File</FieldLabel> */}
              <div className="flex gap-2">
                <Input id="file" type="file" onChange={onFileChange} />
                <Button onClick={onUpload} disabled={!file}>
                  Upload
                </Button>
              </div>
              <FieldDescription>Select a file to upload.</FieldDescription>
            </Field>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns([])} data={[]} />
      </CardContent>
    </Card>
  );
}

export default FileCard;
