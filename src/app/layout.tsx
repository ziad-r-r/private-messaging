import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PRIVATE",
  description: "Messaging without a phone number or email. Find people by username or Private ID.",
  icons: { icon: "/mark.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,460;9..144,560&family=Outfit:wght@380;500;620&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
