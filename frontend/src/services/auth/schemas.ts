import { z } from "zod";

export const UsernameSchema = z.object({
  username: z.string().max(20, "Username must be shorter than 21 characters!"),
});

export const PasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be longer than 7 characters!")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter!")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter!")
    .regex(/\d/, "Password must contain at least 1 digit!"),
});

export const UserCredentialsSchema = UsernameSchema.merge(PasswordSchema);

export type UserCredentialsType = z.infer<typeof UserCredentialsSchema>;
