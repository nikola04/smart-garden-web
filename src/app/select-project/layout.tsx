import "@/app/globals.css";
import AuthGuard from "@/components/wrappers/authguard.wrapper";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <AuthGuard>{children}</AuthGuard>;
}
