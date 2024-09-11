"use server";

import { Bcrypt } from "oslo/password";
import { SignInRequest, SignUpRequest } from "../model/authentication-model";
import { prisma } from "../prisma";
import { lucia } from "../lucia";
import { cookies } from "next/headers";
import { validateRequest } from "../validate-request";

export const signUp = async (request: SignUpRequest) => {
	const isUserExist = await prisma.user.findUnique({
		where: {
			email: request.email,
		},
	});

	if (isUserExist) {
		return {
			errors: "Email already exist",
		};
	}

	try {
		const hashPassword = await new Bcrypt().hash(request.password);

		const user = await prisma.user.create({
			data: {
				firstName: request.firstName,
				lastName: request.lastName,
				email: request.email,
				password: hashPassword,
			},
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);

		return {
			user,
		};
	} catch (error) {
		console.error(error);
	}
};

export const signIn = async (request: SignInRequest) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: request.email,
			},
		});

		if (!user) {
			return {
				errors: "Invalid credentials",
			};
		}

		const isPasswordMatch = await new Bcrypt().verify(
			user.password,
			request.password
		);

		if (!isPasswordMatch) {
			return {
				errors: "Invalid credentials",
			};
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);

		return {
			user,
		};
	} catch (error) {
		console.error(error);
	}
};

export const signOut = async () => {
	const { session } = await validateRequest();
	if (!session) {
		return {
			errors: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return {
		success: true,
	};
};
