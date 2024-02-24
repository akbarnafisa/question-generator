import "~/styles/globals.css";

import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/common/Navbar";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "QuestionGenerator - Quiz question generator tool",
  description: "Quiz question generator tool",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <NextTopLoader color="#1c1917" />
          <Navbar />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
