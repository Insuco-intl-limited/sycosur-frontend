import type React from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Toast from "@/components/shared/Toast";
import ReduxProvider from "@/lib/redux/provider";
import { NextIntlClientProvider } from "next-intl";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Sycosur2.0 | Social Data Management Platform",
	description: "Social Data Management Application for Insuco Intl",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={roboto.className} suppressHydrationWarning>
				<Toast />
				<NextIntlClientProvider>
					<ReduxProvider>{children}</ReduxProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
