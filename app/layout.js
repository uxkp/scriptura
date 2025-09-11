import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { AlertProvider } from "@/components/AlertProvider";
import HolyLoader from "holy-loader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Scriptura",
  description: "Write comprehensive and expressive blogs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased !important`}>
        <HolyLoader color="#d6c7ff" height="0.2rem" />
        <Providers>
          <AlertProvider>{children}</AlertProvider>
        </Providers>
      </body>
    </html>
  );
}
