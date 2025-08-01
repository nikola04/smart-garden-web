import { RouterProvider } from "react-router"
import { router } from "./router"
import { AuthProvider } from "@/providers/AuthProvider"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/ThemeProvider"

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
                <Toaster />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
