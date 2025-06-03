'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { loggedIn, loading } = useAuth();
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (loading || loggedIn)
            return;
        router.push(`/auth/login?redirect=${encodeURIComponent(path)}`);
    }, [loading, loggedIn, router, path]);

    return children;
}
