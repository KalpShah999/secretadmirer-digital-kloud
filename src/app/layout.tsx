import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scavenger Hunt",
  description: "A small interactive scavenger hunt built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply min-h-screen so flex centering works */}
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
