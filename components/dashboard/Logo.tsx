"use client";
import logo from "@/public/assets/images/sycosur_title.png";
import Image from "next/image";

interface LogoProps {
	className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<Image className="h-12 w-28" src={logo} alt="Sycosur logo" />
		</div>
	);
};
