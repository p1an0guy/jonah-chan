import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { analyticsConfig } from "./config/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jonah Chan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-accent="orange">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {analyticsConfig.enabled && analyticsConfig.token ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${analyticsConfig.token}"}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
