import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/lib/redux/provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { PersistAuth } from "@/utils";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Providing all messages to the client
	const messages = await getMessages();

	return (
		<NextIntlClientProvider locale={locale as any} messages={messages}>
			<PersistAuth />
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
