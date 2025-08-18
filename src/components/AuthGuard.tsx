import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function AuthGuard() {
    const { loggedIn, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (loading || loggedIn)
            return;

        navigate(`/auth/login?redirect=${encodeURIComponent(location.pathname)}`)
    }, [loading, location.pathname, loggedIn, navigate])
    
    return <Outlet />
}
