"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ProjectList } from "../projects-list";

export default function ProjectsWrapper() {
    return <Suspense fallback={<ProjectSkeleton />}>
        <ProjectsAuthCheck />
    </Suspense>
}

function ProjectSkeleton() {
    return <div>Loading projects...</div>;
}

function ProjectsAuthCheck() {
    const { loggedIn, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !loggedIn) 
            router.push("/login?redirect=/project/select-project");
    }, [loggedIn, loading, router]);
    
    return <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Project</h2>
        <ProjectList />
    </div>
}
