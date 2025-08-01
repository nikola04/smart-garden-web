import { useAuth } from "@/hooks/useAuth";
import { useEffect, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router";

export default function AuthGuard({ children }: PropsWithChildren) {
    const { loggedIn, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (loading || loggedIn)
            return;

        navigate(`/auth/login?redirect=${encodeURIComponent(location.pathname)}`)
    }, [loading, location.pathname, loggedIn, navigate])

    return children
}
