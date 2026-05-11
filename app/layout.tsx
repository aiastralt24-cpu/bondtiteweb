import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bondtite.in"),
  title: "Bondtite | The bond that holds India",
  description:
    "Bondtite adhesives are engineered for demanding workshops, humid sites, dry heat, furniture, fabrication and construction trades."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
