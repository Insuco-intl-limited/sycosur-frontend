// Importation des composants et dépendances nécessaires
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/public/assets/images/sycosur_title.png";

// Définition du type pour les props du composant
type FormHeaderProps = {
	title?: string;
	staticText?: string;
	linkText?: string;
	linkHref?: string;
	icon?: boolean;
};

// Définition du composant avec destructuration des props
function AuthFormHeader({
	title,
	staticText,
	linkHref,
	linkText,
	icon = true,
}: FormHeaderProps) {
	return (
		// Conteneur principal avec design plat et moderne
		<div className="w-full max-w-2xl mx-auto px-6 py-8">
			{/* Logo SYCOSUR2.0 avec design atypique */}
			{icon && (
				<div className="flex justify-center mb-8">
					<div className="relative group">
						{/* Container principal du logo */}
						<div className="relative bg-white dark:bg-gray-900 px-8 py-6">
							{/* Logo image */}
							<div className="text-center">
								<Image
									src={logo}
									alt="SYCOSUR 2.0"
									width={350}
									height={60}
									priority
									className="mx-auto"
								/>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Titre avec design plat et moderne */}
			<div className="text-center space-y-3">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-babyPowder font-robotoSlab">
					{title}
				</h1>

				{/* Ligne décorative subtile */}
				<div className="flex items-center justify-center">
					<div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
				</div>
			</div>

			{/* Section du texte et lien avec design plat */}
			{(staticText || linkText) && linkHref && (
				<div className="mt-2 text-center">
					<p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
						{/* Affiche le texte statique s'il existe */}
						{staticText && <span className="mr-2">{staticText}</span>}

						{/* Lien avec design plat et moderne */}
						{linkText && (
							<Link
								href={linkHref}
								className="inline-flex items-center font-medium text-gray-900 dark:text-lime-400 hover:text-gray-700 dark:hover:text-lime-300 transition-colors duration-200 underline decoration-2 underline-offset-4 decoration-gray-300 dark:decoration-lime-400/50 hover:decoration-gray-500 dark:hover:decoration-lime-300"
							>
								{linkText}
							</Link>
						)}
					</p>
				</div>
			)}
		</div>
	);
}

export default React.memo(AuthFormHeader);
