"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

const languages = [
	{ code: "en", name: "English", flag: "🇺🇸" },
	{ code: "fr", name: "Français", flag: "🇫🇷" },
	{ code: "es", name: "Español", flag: "🇪🇸" },
];

export function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();

	const handleLanguageChange = (locale: string) => {
		const segments = pathname.split("/");
		segments[1] = locale;
		router.push(segments.join("/"));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="p-4">
					<GlobeAltIcon className="h-7 w-7 text-white" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => handleLanguageChange(lang.code)}
					>
						<span className="mr-2">{lang.flag}</span>
						{lang.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
