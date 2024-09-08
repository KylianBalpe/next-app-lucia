import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center w-screen h-screen gap-4">
			<div className="inline-flex gap-4">
				<Button asChild>
					<Link href="/sign-up">Sign Up</Link>
				</Button>
				<Button asChild>
					<Link href="/sign-in">Sign In</Link>
				</Button>
			</div>
			<ThemeToggle />
		</main>
	);
}
