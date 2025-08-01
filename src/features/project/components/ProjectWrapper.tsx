import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ProjectSkeleton } from "./ProjectSkeleton";
import { useProject } from "../hooks/useProject";

function ProjectWrapper({ children }: { children: React.ReactNode }) {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const isValidId = typeof projectId === 'string'
    const { project, loading } = useProject(isValidId ? projectId : undefined);

    useEffect(() => {
        if (isValidId && (loading || project))
            return;
        navigate('/project/select-project', { replace: true });
    }, [loading, project, isValidId, navigate]);

    if (loading) {
        return <ProjectSkeleton />;
    }

    if(!isValidId || !project) return <div className="p-6 text-center">Redirecting...</div>;

    return children;
}

export default ProjectWrapper
