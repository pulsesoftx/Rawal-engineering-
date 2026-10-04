import type { Metadata } from "next";
import "./globals.css";
import SiteFooter from "./components/SiteFooter";
import WhatsAppPopup from "./components/WhatsAppPopup";

export const metadata: Metadata = {
  title: "RAWAL Engineering | Build what matters",
  description: "A people-first engineering company shaping resilient places and infrastructure.",
  icons: {
    icon: "/logo-transparent.svg",
    shortcut: "/logo-transparent.svg",
    apple: "/logo-transparent.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppPopup />
        <SiteFooter />
      </body>
    </html>
  );
}
