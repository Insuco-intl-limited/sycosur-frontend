import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Toast from "@/components/shared/Toast";
import ReduxProvider from "@/lib/redux/provider";
import PersistAuth from "../utils/PersistAuth";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SYCOSUR2.0",
  description: "Application de gestion de données sociales",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
            < Toast />
            <ReduxProvider>
              <PersistAuth/>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </ReduxProvider>
      </body>
    </html>
  )
}
