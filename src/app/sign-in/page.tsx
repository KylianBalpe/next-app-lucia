import SignInForm from "@/components/authentication/signin-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
	return (
		<main className="flex items-center justify-center w-screen h-screen flex-col gap-4">
			<SignInForm />
			<Button variant="link" asChild>
				<Link href="/sign-up">Sign Up</Link>
			</Button>
		</main>
	);
}
