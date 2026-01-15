import { z } from "zod";

export const createRecruiterSchema = z.object({
	name: z.string().min(2).max(50),
	role: z.string().min(2).max(50),
	working_at: z.string().min(2).max(50),
	linkedin_url: z.url().optional(),
	email: z.email().optional(),
	phone: z
		.string()
		.min(10, { message: "Must be a valid mobile number" })
		.max(14, { message: "Must be a valid mobile number" })
		.optional(),
	location: z.string().min(2).max(50).optional(),
	note: z.string().optional().optional(),
});
