import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "../services/project";
import type { IProject } from "@/types/project";
import { isValidProjectName } from "@/validators/project";
import { Label } from "@radix-ui/react-label";
import { Save } from "lucide-react";
import { useCallback, useMemo, useState, type Dispatch } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function NewProjectSheet({ open, setOpen, onCreate, children }: {
    open: boolean,
    setOpen: Dispatch<boolean>;
    onCreate: (project: IProject) => void;
    children?: React.PropsWithoutRef<"div">
}){
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

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
        navigate(`/project/${project.id}`);
    }, [name, description, onCreate, setOpen, navigate]);
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

export default NewProjectSheet
