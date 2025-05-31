import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Using Outfit font which is more rounded and subtle
const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerMasters - Your Gateway to Studying Abroad",
  description:
    "CareerMasters connects students to global educational opportunities, offering comprehensive services from study tours to visa assistance.",
    icons:{
      icon: '/icon.png'
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
