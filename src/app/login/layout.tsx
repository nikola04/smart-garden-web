import "../globals.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
        </div>
    </div>;
}
