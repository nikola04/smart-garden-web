import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <html lang="en">
        <body className="">
            <TooltipProvider>
                <AuthProvider>
                    { children }
                </AuthProvider>
            </TooltipProvider>
            <Toaster />
        </body>
    </html>;
}
