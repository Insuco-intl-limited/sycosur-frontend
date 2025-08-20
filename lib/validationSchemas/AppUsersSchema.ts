import * as z from "zod";

export const AppUsersSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, { message: "Display name must be at least 2 characters long" })
    .max(50, { message: "Display name must be less than 50 characters long" }),
});

export type TAppUsersSchema = z.infer<typeof AppUsersSchema>;