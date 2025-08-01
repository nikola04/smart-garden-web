import { useAuth } from "@/hooks/useAuth";
import { useEffect, useMemo, useRef, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

function LoginWrapper({ children }: PropsWithChildren){
    const { loggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirectParam = searchParams.get('redirect');
    const loginError = searchParams.get('error');
    const path = useMemo(() => typeof redirectParam === "string" ? redirectParam : '/', [redirectParam]);

    const hasHandledErrorRef = useRef(false);
    useEffect(() => {
        if(!loginError || hasHandledErrorRef.current)
            return;

        if(loginError === "google-not-found")
            toast("Google account not linked.");
        if(loginError === "google-no-code")
            toast("Invalid google login request.")

        hasHandledErrorRef.current = true;

        const newParams = new URLSearchParams(location.search);
        newParams.delete('error');
        navigate(location.pathname + '?' + newParams.toString(), { replace: true })
    }, [location.pathname, location.search, loginError, navigate]);

    useEffect(() => {
        if (loggedIn){
            navigate(path);
        }
    }, [loggedIn, navigate, path])

    return children
}

export default LoginWrapper
