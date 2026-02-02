import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Field, FieldDescription } from "@/components/ui/field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";
import { fi } from "date-fns/locale";

const MAX_MB = 5;
const MAX_BYTES = MAX_MB * 1024 * 1024;

type FileType = {
  id: string;
  category: string;
  file_name: string;
  file_type: string;
  source: string;
  size_bytes: number;
  created_at: string;
};

/* async function fetchFileCol(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/application/${id}/file`);

    if (!res.ok) throw new Error("Fetched failed!");

    const data = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
} */

function FileCard({
  id,
  fileCol,
  refetchFileCol,
}: {
  id?: string;
  fileCol: FileType[] | null;
  refetchFileCol: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;

    if (!selected) return;

    if (selected.size > MAX_BYTES) {
      e.currentTarget.value = "";
      return;
    }
    setFile(selected);
  };

  const onUpload = async () => {
    if (!id) return;
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("source", "manual");

    try {
      const res = await fetch(
        `http://localhost:4000/api/application/${id}/file/upload`,
        {
          method: "POST",
          body: fd,
        },
      );

      if (!res.ok) throw new Error("Upload failed");
      setFile(null);
      refetchFileCol();
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async (fileId: string) => {
    try {
      const res = await fetch(`http://localhost:4000/api/file/${fileId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed!");

      refetchFileCol();
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const files = [
    {
      value: "resume",
      trigger: "Resume",
      content: fileCol?.find((file) => file.category.toLowerCase() == "resume"),
    },
    {
      value: "coverletter",
      trigger: "Cover Letter",
      content: fileCol?.find(
        (file) => file.category.toLowerCase() == "cover_letter",
      ),
    },
    {
      value: "other",
      trigger: "Others",
      content: fileCol?.filter(
        (file) => file.category.toLowerCase() == "other",
      ),
    },
  ];

  return (
    <Card>
      {/*  <CardHeader className="flex justify-end">
        <Dialog>
          <div className="flex items-center justify-center gap-2">
            <DialogDescription className="text-base">
              ({fileCol?.length}/5)
            </DialogDescription>
            <DialogTrigger asChild>
              <Button disabled={fileCol ? fileCol?.length >= 5 : false}>
                Upload
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Field>
              <div className="flex gap-2">
                <Input id="file" type="file" onChange={onFileChange} />
                <DialogTrigger asChild>
                  <Button onClick={onUpload} disabled={!file}>
                    Upload
                  </Button>
                </DialogTrigger>
              </div>
              <FieldDescription>Select a file to upload.</FieldDescription>
            </Field>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {fileCol ? (
          <DataTable
            columns={columns({ onDelete: (id: string) => onDelete(id) })}
            data={fileCol}
          />
        ) : (
          <></>
        )}
      </CardContent> */}
      <CardContent>
        <Accordion type="single" defaultValue="resume">
          {fileCol && fileCol.length > 0 ? (
            <>
              {files.map((file) => (
                <AccordionItem value={file.value} key={file.value}>
                  <AccordionTrigger>{file.trigger}</AccordionTrigger>
                  <AccordionContent>
                    {file.content ? (
                      <div className="flex gap-6">
                        {Array.isArray(file.content) ? (
                          <>
                            {file.content.map((file) => (
                              <div key={file.id} className="">
                                <p>
                                  <strong>File:</strong> {file.file_name}
                                </p>
                                <p>
                                  <strong>Type:</strong> {file.file_type}
                                </p>
                                <p>
                                  <strong>Size:</strong>{" "}
                                  {(file.size_bytes / 1024).toFixed(2)} KB
                                </p>
                                <Button
                                  onClick={() => onDelete(file.id)}
                                  variant="destructive"
                                  className="mt-2"
                                >
                                  Delete
                                </Button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div>
                            <p>
                              <strong>File:</strong> {file.content.file_name}
                            </p>
                            <p>
                              <strong>Type:</strong> {file.content.file_type}
                            </p>
                            <p>
                              <strong>Size:</strong>{" "}
                              {(file.content.size_bytes / 1024).toFixed(2)} KB
                            </p>
                            <Button
                              // onClick={() => onDelete(!Array.isArray(file.content) && file.content ? file.content.id : "")}
                              variant="destructive"
                              className="mt-2"
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Empty>
                        <EmptyContent>
                          <EmptyTitle>
                            No {file.trigger.toLowerCase()} uploaded yet
                          </EmptyTitle>
                          <EmptyDescription>
                            Add your {file.trigger.toLowerCase()} here to keep
                            track of what you sent for this role.
                          </EmptyDescription>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                disabled={
                                  fileCol ? fileCol?.length >= 5 : false
                                }
                                className="mt-6"
                              >
                                Upload {file.trigger.toLowerCase()}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Upload File</DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                              <Field>
                                <div className="flex gap-2">
                                  <Input
                                    id="file"
                                    type="file"
                                    onChange={onFileChange}
                                  />
                                  <DialogTrigger asChild>
                                    <Button onClick={onUpload} disabled={!file}>
                                      Upload
                                    </Button>
                                  </DialogTrigger>
                                </div>
                                <FieldDescription>
                                  Select a file to upload.
                                </FieldDescription>
                              </Field>
                            </DialogContent>
                          </Dialog>
                        </EmptyContent>
                      </Empty>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </>
          ) : (
            <></>
          )}

          {/* <AccordionItem value="resume">
            <AccordionTrigger>Resume</AccordionTrigger>
            <AccordionContent>
              
              {!fileCol || fileCol?.length == 0 ? (
                <Card>
                  <CardContent>
                    <Empty>
                      <EmptyContent>
                        <EmptyTitle>No resume uploaded yet</EmptyTitle>
                        <EmptyDescription>
                          Add your resume here to keep track of what you sent
                          for this role.
                        </EmptyDescription>
                      </EmptyContent>
                    </Empty>
                  </CardContent>
                </Card>
              ) : (
                <Empty>
                  <EmptyContent>
                    <EmptyTitle>No resume uploaded yet</EmptyTitle>
                    <EmptyDescription>
                      Add your resume here to keep track of what you sent for
                      this role.
                    </EmptyDescription>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          disabled={fileCol ? fileCol?.length >= 5 : false}
                          className="mt-6"
                        >
                          Upload resume
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload File</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <Field>
                          <div className="flex gap-2">
                            <Input
                              id="file"
                              type="file"
                              onChange={onFileChange}
                            />
                            <DialogTrigger asChild>
                              <Button onClick={onUpload} disabled={!file}>
                                Upload
                              </Button>
                            </DialogTrigger>
                          </div>
                          <FieldDescription>
                            Select a file to upload.
                          </FieldDescription>
                        </Field>
                      </DialogContent>
                    </Dialog>
                  </EmptyContent>
                </Empty>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="coverletter">
            <AccordionTrigger>Cover Letter</AccordionTrigger>
            <AccordionContent>
              {!fileCol || fileCol?.length == 0 ? (
                <Card>
                  <CardContent>
                    <Empty>
                      <EmptyContent>
                        <EmptyTitle>No resume uploaded yet</EmptyTitle>
                        <EmptyDescription>
                          Add your resume here to keep track of what you sent
                          for this role.
                        </EmptyDescription>
                      </EmptyContent>
                    </Empty>
                  </CardContent>
                </Card>
              ) : (
                <Empty>
                  <EmptyContent>
                    <EmptyTitle>No resume uploaded yet</EmptyTitle>
                    <EmptyDescription>
                      Add your resume here to keep track of what you sent for
                      this role.
                    </EmptyDescription>
                    <Button>Upload resume</Button>
                  </EmptyContent>
                </Empty>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="others">
            <AccordionTrigger>others</AccordionTrigger>
            <AccordionContent>
              {!fileCol || fileCol?.length == 0 ? (
                <Card>
                  <CardContent>
                    <Empty>
                      <EmptyContent>
                        <EmptyTitle>No resume uploaded yet</EmptyTitle>
                        <EmptyDescription>
                          Add your resume here to keep track of what you sent
                          for this role.
                        </EmptyDescription>
                      </EmptyContent>
                    </Empty>
                  </CardContent>
                </Card>
              ) : (
                <Empty>
                  <EmptyContent>
                    <EmptyTitle>No resume uploaded yet</EmptyTitle>
                    <EmptyDescription>
                      Add your resume here to keep track of what you sent for
                      this role.
                    </EmptyDescription>
                    <Button>Upload resume</Button>
                  </EmptyContent>
                </Empty>
              )}
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default FileCard;
