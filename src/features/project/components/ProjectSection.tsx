import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export default function ProjectSection({ title, description, Header, children, ...props }: {
    title: string;
    description?: string;
    Header?: ReactNode
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
            <div>
                <p className="font-semibold text-foreground/90">{ title }</p>
                <p className="font-light text-sm text-foreground/60">{ description }</p>
            </div>
            { Header }
        </div>
        <div {...props}>
            { children }
        </div>
    </div>
}
