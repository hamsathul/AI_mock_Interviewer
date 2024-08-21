import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Mock Interview",
  description: "AI Based Mock Interview Platform",
};

export default function RootLayout({ children }) {
  return (
	<ClerkProvider>

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
	</ClerkProvider>
  );
}
