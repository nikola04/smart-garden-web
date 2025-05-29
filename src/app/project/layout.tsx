import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header";
import "@/app/globals.css";
import AuthGuard from "@/components/wrappers/authguard.wrapper";
import ProjectWrapper from "@/components/wrappers/project.wrapper";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <SidebarProvider>
        <AuthGuard>
            <ProjectWrapper>
                <AppSidebar/>
                <SidebarInset className="p-2">
                    <AppHeader/>
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </ProjectWrapper>
        </AuthGuard>
    </SidebarProvider>;
}
