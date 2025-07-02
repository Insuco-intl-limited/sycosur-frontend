"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact2Icon, MailIcon, UserCheck2, LockIcon, ShieldCheckIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
	RegisterUserSchema,
	TRegisterUserSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import {useRegisterUserMutation} from "@/lib/redux/features/auth/authApiSlice";

export default function RegisterForm() {
	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TRegisterUserSchema>({
		resolver: zodResolver(RegisterUserSchema),
		mode: "all",
		defaultValues: {
			username: "",
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			re_password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterUserSchema>) => {
		try {
			await registerUser(values).unwrap();
			toast.success(
				"An Email with an activation link has been sent to your email address. Please check your email and activate your account.",
			);
			reset();
			router.push("/login");
		} catch (e) {
			const errorMessage = extractErrorMessage(e);
			toast.error(errorMessage || "An error occurred");
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="w-full max-w-lg">
				{/* Header avec animation */}
				<div className="text-center mb-6">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 dark:from-pumpkin dark:to-orange-500 rounded-full mb-4 shadow-lg">
						<UserCheck2 className="size-8 text-white" />
					</div>
					<h1 className="text-2xl font-bold text-gray-800 dark:text-babyPowder mb-2">
						Create Account
					</h1>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Join us and start your journey
					</p>
				</div>

				{/* Formulaire avec design en carte */}
				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
					<form
						noValidate
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						{/* Ligne pour nom et prénom */}
						<div className="grid grid-cols-2 gap-3">
							<FormFieldComponent
								label="First Name"
								name="first_name"
								register={register}
								errors={errors}
								placeholder="First Name"
								startIcon={<Contact2Icon className="dark:text-babyPowder size-4" />}
							/>
							<FormFieldComponent
								label="Last Name"
								name="last_name"
								register={register}
								errors={errors}
								placeholder="Last Name"
								startIcon={<Contact2Icon className="dark:text-babyPowder size-4" />}
							/>
						</div>

						{/* Username avec style distinct */}
						<div className="relative">
							<FormFieldComponent
								label="Username"
								name="username"
								register={register}
								errors={errors}
								placeholder="Choose a unique username"
								startIcon={<UserCheck2 className="dark:text-babyPowder size-4" />}
							/>
						</div>

						{/* Email avec validation visuelle */}
						<FormFieldComponent
							label="Email Address"
							name="email"
							register={register}
							errors={errors}
							placeholder="your.email@example.com"
							startIcon={<MailIcon className="dark:text-babyPowder size-4" />}
						/>

						{/* Mots de passe côte à côte sur grands écrans */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<FormFieldComponent
								label="Password"
								name="password"
								register={register}
								errors={errors}
								placeholder="Create password"
								startIcon={<LockIcon className="dark:text-babyPowder size-4" />}
								isPassword={true}
							/>
							<FormFieldComponent
								label="Confirm Password"
								name="re_password"
								register={register}
								errors={errors}
								placeholder="Confirm password"
								startIcon={<ShieldCheckIcon className="dark:text-babyPowder size-4" />}
								isPassword={true}
							/>
						</div>

						{/* Bouton submit avec design amélioré */}
						<Button
							type="submit"
							className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-pumpkin dark:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] disabled:transform-none disabled:opacity-70"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<Spinner size="sm" />
									<span>Creating Account...</span>
								</div>
							) : (
								<div className="flex items-center justify-center gap-2">
									<UserCheck2 className="size-5" />
									<span>Create Account</span>
								</div>
							)}
						</Button>

						{/* Message d'aide */}
						<p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
							By creating an account, you agree to our terms and conditions
						</p>
					</form>
				</div>

				{/* Lien vers la connexion */}
				<div className="text-center mt-6">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Already have an account?{" "}
						<button
							onClick={() => router.push("/login")}
							className="text-green-600 dark:text-pumpkin hover:underline font-medium"
						>
							Sign in here
						</button>
					</p>
				</div>
			</div>
		</main>
	);
}