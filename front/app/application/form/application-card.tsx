"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function ApplicationCard() {
  // const router = useRouter();

  const CreateApplictaion = () => {};

  return (
    <Card className="h-full">
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <FileQuestionMark />
            </EmptyMedia>
            <EmptyTitle>No Application Yet</EmptyTitle>
            <EmptyDescription>Create an application to start.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Create Application
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
}

export default ApplicationCard;
