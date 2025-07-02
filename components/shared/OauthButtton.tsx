import clsx from "clsx";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
	provider: "google";
	children: React.ReactNode;
	[rest: string]: any;
}

export default function OauthButton({ provider, children, ...rest }: Props) {
	const className = clsx(
		"text-white mt-3 flex-1 rounded-md px-3 py-2 font-medium",
		{
			"bg-red-600 hover:bg-red-700": provider === "google",
		},
	);
	return (
		<Button className={className} {...rest}>
			<span className="flex items-center justify-start">{children}</span>
		</Button>
	);
}