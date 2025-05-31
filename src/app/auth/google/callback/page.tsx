"use client"

import { useAuth } from "@/hooks/use-auth";
import { googleCallback } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function CallbackPage(){
    const { login, loggedIn } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const googleLogin = useCallback(async (code: string, state: string) => {
        const resp = await googleCallback(code, state);
        if(!resp){
            router.push("/login?error=google-not-found");
            return ;
        }
        login(resp.user, resp.accessToken, resp.csrfToken);
    }, [router]);

    useEffect(() => {
        if(loggedIn)
            router.push("/");
    }, [loggedIn, router]);

    useEffect(() => {
        if(!code || !state){
            router.push("/login?error=google-no-code");
            return;
        }
        googleLogin(code, state);
    }, [code, state, googleLogin])
    return <div className="w-screen h-screen flex items-center justify-center">
        <ClipLoader color="--primary" size={56} />
    </div>
}
