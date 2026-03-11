import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GroundUp Pulse - Civic Issue Solver Powered By AI",
  description: "GroundUp Pulse is an AI-powered civic issue solver that empowers citizens to report and resolve local problems efficiently. Our platform leverages advanced AI technology to analyze and prioritize issues, connecting users with the right resources and authorities for swift resolution. Join us in creating smarter, more responsive communities with GroundUp Pulse.",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
