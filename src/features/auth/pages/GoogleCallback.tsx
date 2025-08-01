import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { googleCallback } from "@/services/auth";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router'

export default function GoogleCallback(){
    const { login, loggedIn } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    const googleLogin = useCallback(async (code: string, state: string) => {
        const resp = await googleCallback(code, state);
        if(!resp){
            navigate("/login?error=google-not-found");
            return ;
        }
        login(resp.user, resp.accessToken, resp.csrfToken);
    }, [navigate]);

    useEffect(() => {
        if(loggedIn)
            navigate("/project/select-project");
    }, [loggedIn, navigate]);

    useEffect(() => {
        if(!code || !state){
            navigate("/login?error=google-no-code");
            return;
        }
        googleLogin(code, state);
    }, [code, state, googleLogin, navigate])
    return <div className="w-screen h-screen flex items-center justify-center">
        <Spinner color="--primary" size={56} />
    </div>
}
