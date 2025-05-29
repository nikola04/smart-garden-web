"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { ProjectList } from "../projects-list";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { isValidProjectName } from "@/validators/project";
import { Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { createProject } from "@/services/project";
import { toast } from "sonner";
import { IProject } from "@/types/project";
import { useProjects } from "@/hooks/use-projects";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ProjectsListSkeleton } from "../skeletons/projects.skeleton";

export default function ProjectsWrapper() {
    return <div className="pb-8">
        <div className="container mx-auto mt-8">
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl font-bold text-center">Select Project</h2>
                <p className="text-center font-light">Choose a project to view or edit its details.</p>
            </div>
            <Suspense fallback={<ProjectsListSkeleton />}>
                <ProjectSelector />
            </Suspense>
        </div>
    </div>
}

function ProjectSelector() {
    const { projects, loading, setProjects } = useProjects();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hasNewParam = searchParams.has('new');
    const [open, setOpen] = useState<boolean>(hasNewParam);
    const router = useRouter();

    useEffect(() => {
        if(!(hasNewParam && !open)) return;
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('new');
        router.replace(pathname + '?' + newParams.toString())
    }, [pathname, searchParams, router, open, hasNewParam]);

    const addProject = (project: IProject) => setProjects(prev => [...prev, project]);

    if(loading)
        return <ProjectsListSkeleton />
    return <>
        <ProjectList projects={projects} onNewProject={() => setOpen(true)} />
        <NewProjectSheet open={open} setOpen={setOpen} onCreate={addProject} />
    </>
}

function NewProjectSheet({ open, setOpen, onCreate, children }: {
    open: boolean,
    setOpen: Dispatch<boolean>;
    onCreate: (project: IProject) => void;
    children?: React.PropsWithoutRef<"div">
}){
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const isValid = useMemo(() => isValidProjectName(name) && description.length <= 100, [name, description]);

    const handleCreate = useCallback(async () => {
        setLoading(true);
        const project = await createProject(name, description);
        setLoading(false);
        if(!project)
            return;
        toast("Project created successfully");
        setName("");
        setDescription("");
        onCreate(project);
        setOpen(false);
        router.push(`/project/${project.id}`);
    }, [name, description, router, onCreate, setOpen]);
    return <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            { children }
        </SheetTrigger>
        <SheetContent className="p-2">
            <SheetHeader>
                <SheetTitle>New Project</SheetTitle>
                <SheetDescription>Add new project. Click Create when you&apos;re done.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-4 px-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="project-name" className="text-sm font-medium">Project Name <span className="text-primary text-sm">*</span></label>
                    <Input id="project-name" maxLength={30} placeholder="My Project" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="project-desc" className="text-sm font-medium">Description</Label>
                    <Textarea id="project-desc" maxLength={100} className="col-span-3" placeholder="Project description..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <Button type="submit" onClick={handleCreate} disabled={!isValid || loading}><Save/>Create</Button>
            </div>
        </SheetContent>
    </Sheet>
}
