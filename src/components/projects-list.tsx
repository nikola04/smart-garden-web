"use client";

import { useProjects } from "@/hooks/use-projects";
import { IProject } from "@/types/project";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjectList() {
    const { projects } = useProjects();

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
        ))}
    </div>
}

function ProjectCard({ project }: { project: IProject }) {
    const router = useRouter();
    const description = project.description == null || project.description.length == 0 ? "No description." : project.description;
    const handleSelect = () => router.push(`/project/${project.id}`);
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle>
                    <Link href={`/project/${project.id}`} className="text-lg font-medium">{project.name}</Link>
                </CardTitle>
                <CardDescription>
                    <p className="font-light">{description}</p>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="ml-auto">
                    <Button onClick={handleSelect}><SquareArrowOutUpRight />Select</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
