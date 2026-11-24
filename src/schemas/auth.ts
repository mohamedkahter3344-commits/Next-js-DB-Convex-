import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "At Least 3 Characters")
    .max(30, "At Most 30 Characters"),
  email: z.email(),
  password: z
    .string()
    .min(8, "At Least 8 Characters")
    .max(30, "At Most 30 Characters"),
});

export type typeSignUpSchema = z.infer<typeof signUpSchema>; 


export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "At Least 8 Characters")
    .max(30, "At Most 30 Characters"),
})

export type typeLoginSchema = z.infer<typeof loginSchema>;