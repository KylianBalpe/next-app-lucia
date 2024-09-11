"use client";

import * as React from "react";

import { signOut } from "@/lib/actions/authentication-action";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function SignOutAction() {
	async function onSubmit() {
		try {
			const res = await signOut();

			if (res?.errors) {
				console.error(res?.errors);
				toast(res?.errors);
				return;
			}

			redirect("/sign-in");
		} catch (error) {
			console.error(error);
		}
	}
	return <Button onClick={onSubmit}>Sign Out</Button>;
}
