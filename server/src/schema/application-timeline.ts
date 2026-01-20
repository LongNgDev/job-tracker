import z from "zod";

export const createApplicationTimelineSchema = z.object({
	event_type: z.string(),
	title: z.string(),
	description: z.string().optional(),
});
