"use client";
import React from "react";
import { AuthFormHeader, RegisterForm } from "@/components/forms/auth";
import { useRedirectIfAuthenticated } from "@/hooks";
import OauthButtons from "@/components/shared/OauthButttons";

export default function RegisterPage() {
	//useRedirectIfAuthenticated(); #TODO revoir l'implémentation de ce custom hook dans login et register
	return (
		<div>
			{/*<AuthFormHeader*/}
			{/*	title="Sign up for an account"*/}
			{/*	staticText="Already have an account"*/}
			{/*	linkText="Login here"*/}
			{/*	linkHref="/login"*/}
			{/*/>*/}

			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[560px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-6 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<RegisterForm />
					<div className="flex-center mt-5 space-x-2">
						<div className="bg-richBlack dark:bg-platinum h-px flex-1"></div>
					</div>
					<OauthButtons />
				</div>
			</div>
		</div>
	);
}
