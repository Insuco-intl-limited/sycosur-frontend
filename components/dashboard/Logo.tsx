"use client";

interface LogoProps {
	className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<div className="w-8 h-8 bg-white flex items-center justify-center">
				<span className="text-[#416c78] font-bold text-sm">S-S</span>
			</div>
			<span className="text-white font-roboto font-medium text-lg">
				SYCOSUR
			</span>
		</div>
	);
};
