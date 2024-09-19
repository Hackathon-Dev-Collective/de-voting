import type { Metadata } from "next";
import Web3providers from "./provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linea Voting",
  description: "Web3 voting platform on Linea",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3providers>{children}</Web3providers>
      </body>
    </html>
  );
}
