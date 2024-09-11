import SignOutAction from "@/components/authentication/signout";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/validate-request";
import Link from "next/link";

export default async function Home() {
	const { user } = await validateRequest();

	return (
		<main className="flex flex-col items-center justify-center w-screen h-screen gap-4">
			{!user && (
				<div className="inline-flex gap-4">
					<Button asChild>
						<Link href="/sign-up">Sign Up</Link>
					</Button>
					<Button asChild>
						<Link href="/sign-in">Sign In</Link>
					</Button>
				</div>
			)}
			{user && (
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-medium">Welcome, {user.firstName}!</h1>
					<SignOutAction />
				</div>
			)}
			<ThemeToggle />
		</main>
	);
}
