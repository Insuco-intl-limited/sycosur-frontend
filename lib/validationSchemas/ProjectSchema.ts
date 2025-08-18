import * as z from "zod";

export const ProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Project name must be at least 2 characters long" })
    .max(100, { message: "Project name must be less than 100 characters long" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description must be less than 500 characters long" }),
});

export type TProjectSchema = z.infer<typeof ProjectSchema>;