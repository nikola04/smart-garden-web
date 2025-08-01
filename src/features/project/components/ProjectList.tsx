"use client";

import type { IProject } from "@/types/project";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Plus, SquareArrowOutUpRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

export function ProjectList({ projects, onNewProject }: {
    projects: IProject[],
    onNewProject: () => void;
}) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
        ))}
        <NewProjectCard onClick={onNewProject} />
    </div>
}

function NewProjectCard({ onClick }: {
    onClick: () => void;
}){
    return <Card onClick={onClick} className="border-dashed border-2 border-[#ccc] text-[#aaa] hover:border-primary hover:text-primary bg-transparent transition-all cursor-pointer">
        <CardHeader />
        <CardContent className="flex items-center justify-center h-full">
            <Plus size={28}/>
        </CardContent>
        <CardFooter />
    </Card>
}

function ProjectCard({ project }: { project: IProject }) {
    const navigate = useNavigate();
    const description = project.description == null || project.description.length == 0 ? "No description." : project.description;

    const handleSelect = () => navigate(`/project/${project.id}`);
    const handleConfig = () => navigate(`/project/${project.id}/settings`)
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle>
                    <Link to={`/project/${project.id}`} className="text-lg font-medium">{project.name}</Link>
                </CardTitle>
                <CardDescription>
                    <p className="font-light truncate">{description}</p>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex items-center gap-2 ml-auto">
                    <Button variant={"ghost"} onClick={handleConfig} className="font-normal"><Wrench /></Button>
                    <Button variant={"secondary"} onClick={handleSelect} className="font-normal hover:bg-primary hover:text-white"><SquareArrowOutUpRight />Select</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
