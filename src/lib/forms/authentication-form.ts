import { z } from "zod";

export const SignUpFormSchema = z.object({
	firstName: z
		.string({ required_error: "First name cannot be empty" })
		.min(3, "First name must contain at least 3 character(s)")
		.max(255, "First name cannot more than 255 character(s)"),
	lastName: z
		.string()
		.max(255, "Last name cannot more than 255 character(s)")
		.optional(),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, "Password must contain at least 6 character(s)")
		.max(100, "Password cannot more than 100 character(s)"),
});

export const SignInFormSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(6, "Password must contain at least 6 character(s)")
		.max(100, "Password cannot more than 100 character(s)"),
});
