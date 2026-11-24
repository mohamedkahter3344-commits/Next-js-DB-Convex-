import * as z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .nonempty()
    .trim()
    .min(3, "At Least 3 Characters")
    .max(50, "At Most 50 Characters"),
  content: z.string().nonempty().trim().min(10, "At Least 10 Characters"),
});


export type typePostSchema = z.infer<typeof postSchema>;
