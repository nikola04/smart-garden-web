import { RouterProvider } from "react-router"
import { router } from "./router"
import { AuthProvider } from "@/providers/AuthProvider"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/ThemeProvider"

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <div style={{ background: 'var(--background-alt)'}}>
                    <RouterProvider router={router} />
                    <Toaster />
                </div>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
