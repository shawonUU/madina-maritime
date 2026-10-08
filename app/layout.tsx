import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import QueryProvider from "./providers/QueryProvider";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Madina Maritime",
    description: "Premium Maritime Services",
    icons: {
        icon: "/images/favicon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn("font-sans", geist.variable)}
        >
            <body className="bg-gray-50 text-gray-900">
                <QueryProvider>
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}
