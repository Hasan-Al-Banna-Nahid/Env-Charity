import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/app/_components/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoAction - Environmental Organization",
  description: "Promoting sustainability and climate action",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
