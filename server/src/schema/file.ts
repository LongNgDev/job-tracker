import z from "zod";

export const createFileSchema = z.object({
	source: z.enum(["manual", "auto"]).default("manual"),
});
