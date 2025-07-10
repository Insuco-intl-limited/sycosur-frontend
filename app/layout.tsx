import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toast from "@/components/shared/Toast";
import ReduxProvider from "@/lib/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sycosur2.0 |",
	description: "Social Data Management Platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<Toast />
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
