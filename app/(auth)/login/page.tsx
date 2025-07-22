"use client";
import React from "react";
import LoginForm from "@/components/forms/auth/LoginForm";
import { AuthFormHeader } from "@/components/forms/auth";
import OauthButtons from "@/components/shared/OauthButttons";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import Link from "next/link";
import bgImg from "@/public/assets/images/sycosur_background.jpg";
import Image from "next/image";
import logo from "@/public/assets/images/sycosur_title.png";
export default function LoginPage() {
	//	useRedirectIfAuthenticated();
	return (
		<div className="relative h-screen overflow-hidden">
			{/* Image de fond */}
			<div className="fixed inset-0 z-0">
				<Image
					src={bgImg}
					alt="Authentication Background Image"
					fill
					className="object-cover"
				/>
			</div>

			{/* Contenu du formulaire avec z-index plus élevé */}
			<div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
				{/* Logo */}
				<div className="-mt-20">
					<Image
						src={logo}
						alt="Logo"
						width={300}
						height={80}
						className="object-contain "
					/>
				</div>

				{/* Formulaire */}
				<div className="w-full max-w-[480px]">
					<div className=" px-6 py-8  sm:px-12">
						<LoginForm />
						<div className="flex-center mt-4 space-x-2"></div>
						<OauthButtons />
						<div className="mt-4 text-center text-sm">
							<span className="text-muted-foreground">
								Don't have an account?{" "}
							</span>
							<Link href="/register" className="text-primary hover:underline">
								Register here
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
