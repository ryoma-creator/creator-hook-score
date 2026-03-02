import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Hook Score™ — TikTok Hook Checker",
  description:
    "Score your TikTok hook 0–100 in seconds. Get instant tips to boost watch time and go viral.",
  openGraph: {
    title: "Creator Hook Score™",
    description: "Is your hook strong enough? Find out in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
