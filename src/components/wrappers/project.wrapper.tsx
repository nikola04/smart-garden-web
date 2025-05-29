'use client';

import { useProject } from '@/hooks/use-project';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProjectSkeleton } from '../skeletons/project.skeleton';

export default function ProjectWrapper({ children }: { children: React.ReactNode }) {
    const { projectId } = useParams();
    const router = useRouter();

    const isValidId = typeof projectId === 'string'

    const { project, loading } = useProject(isValidId ? projectId : undefined);

    useEffect(() => {
        if (isValidId && (loading || project))
            return;
        router.replace('/select-project');
    }, [loading, project, isValidId, router]);

    if (loading) {
        return <ProjectSkeleton />;
    }

    if(!isValidId || !project) return <div className="p-6 text-center">Redirecting...</div>;

    return children;
}
