"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const formSchema = z.object({
  job_ads_id: z.uuid(),
  status: z.string().min(2).max(30),
  stage: z.string().min(2).max(50),
  last_follow_up: z.string().optional(), // ISO date string
  next_follow_up: z.string().optional(), // ISO date string
  applied_at: z.string(), // ISO date string
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function ApplicationForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: {
    job_ads_id: string;
    status: string;
    stage: string;
    last_follow_up?: string;
    next_follow_up?: string;
    applied_at: string;
    note?: string;
  }) => void;
  onCancel: () => void;
}) {
  // 1. Define a form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_ads_id: "",
      status: "", // my opinion: set a sane default
      stage: "",
      last_follow_up: "",
      next_follow_up: "",
      applied_at: new Date().toISOString().slice(0, 10),
      note: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="row-auto grid grid-cols-2 gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Job Ads ID */}
        <FormField
          control={form.control}
          name="job_ads_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Ad ID<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="UUID of job ad..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Status<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="applied / rejected / offer..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stage */}
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Stage<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="initial / phone screen / onsite..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Applied At */}
        <FormField
          control={form.control}
          name="applied_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Applied At<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Follow Up */}
        <FormField
          control={form.control}
          name="last_follow_up"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Follow Up</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Next Follow Up */}
        <FormField
          control={form.control}
          name="next_follow_up"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Follow Up</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-52 min-h-24 resize-y"
                  placeholder="Short notes..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-start-2 mt-6 flex justify-end gap-2">
          <Button
            type="reset"
            onClick={() => {
              form.reset();
              onCancel();
            }}
            className="hover:cursor-pointer"
            variant={"destructive"}
          >
            Cancel
          </Button>
          <Button type="submit" className="hover:cursor-pointer">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ApplicationForm;
