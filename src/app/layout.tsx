import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <html lang="en">
        <body className="">
            <AuthProvider>
                { children }
            </AuthProvider>
            <Toaster />
        </body>
    </html>;
}
