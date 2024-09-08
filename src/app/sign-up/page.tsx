import SignUpForm from "@/components/authentication/signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
	return (
		<main className="flex items-center justify-center w-screen h-screen flex-col gap-4">
			<SignUpForm />
			<Button variant="link" asChild>
				<Link href="/sign-in">Sign In</Link>
			</Button>
		</main>
	);
}
