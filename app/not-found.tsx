"use client";

import Link from "next/link";
import { LucideHome, LucideArrowLeft } from "lucide-react";

export default function NotFound() {
	// Using Math.random with fixed seeds for server-side rendering
	const generatePosition = (index: number) => {
		return {
			top: `${(index * 5) % 100}%`,
			left: `${(index * 7) % 100}%`,
			width: `${(index % 5 + 1) * 50 + 50}px`,
			height: `${(index % 5 + 1) * 50 + 50}px`,
			animationDuration: `${(index % 5 + 3)}s`,
			animationDelay: `${(index % 3) * 0.5}s`,
		};
	};

	return (
		<div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			{/* Animated background elements */}
			<div className="absolute inset-0 z-0 opacity-20">
				{Array.from({ length: 20 }).map((_, i) => (
					<div 
						key={i}
						className="absolute rounded-full bg-electricIndigo opacity-20 animate-pulse"
						style={generatePosition(i)}
					/>
				))}
			</div>

			{/* Main content with glass effect */}
			<div className="z-10 flex w-full max-w-lg flex-col items-center justify-center gap-8 rounded-xl bg-white/10 p-8 backdrop-blur-lg sm:p-12">
				<div className="flex items-center justify-center">
					<div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-purple-600/30 backdrop-blur-sm sm:h-40 sm:w-40">
						<span className="text-6xl font-bold text-white sm:text-7xl">404</span>
						<div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl text-white animate-bounce sm:h-16 sm:w-16 sm:text-3xl">!</div>
					</div>
				</div>

				<div className="text-center">
					<h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
						Page Non Trouvée
					</h1>
					<p className="mb-8 text-lg text-white/80">
						Oups! La page que vous recherchez semble s'être égarée.
					</p>

					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link
							href="/"
							className="group flex items-center justify-center gap-2 rounded-full bg-electricIndigo px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-electricIndigo/80 hover:shadow-lg hover:shadow-electricIndigo/30 focus:outline-none focus:ring-2 focus:ring-electricIndigo/50 focus:ring-offset-2"
						>
							<LucideHome className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
							Accueil
						</Link>
						<Link
							href="javascript:history.back()"
							className="group flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2"
						>
							<LucideArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
							Retour
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}