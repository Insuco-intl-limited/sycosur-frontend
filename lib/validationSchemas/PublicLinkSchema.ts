import * as z from "zod";

export const PublicLinkSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, { message: "Display name must be at least 2 characters long" })
    .max(100, { message: "Display name must be less than 100 characters long" }),
  once: z
    .boolean()
    .optional()
    .default(false),
});

export type TPublicLinkSchema = z.infer<typeof PublicLinkSchema>;
