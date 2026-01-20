import { z } from "zod";

export const createApplicationSchema = z.object({
	job_ads_id: z.uuid(),
	status: z.string(),
	stage: z.string(),
	last_follow_up_at: z.string().optional(),
	next_follow_up_at: z.string().optional(),
	applied_at: z.string().optional(),
	note: z.string(),
});
