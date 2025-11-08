import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RealEstate AI - Property Management Platform",
  description: "AI-powered property management platform for modern landlords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
