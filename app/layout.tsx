import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <TRPCReactProvider>

      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </TooltipProvider>
        </body>
      </html>
    </TRPCReactProvider>
  );
}
