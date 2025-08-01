import { Skeleton } from '@components/ui/skeleton';
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';

const projectCards = 1;
function ProjectsSkeleton(){
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(projectCards)].map((_, i) => <ProjectCardSkeleton key={i} />)}
    </div>
}

export default ProjectsSkeleton

export function ProjectCardSkeleton(){
    return <Skeleton className="flex flex-col py-7 gap-6 rounded-xl bg-black/5">
        <CardHeader className="flex flex-col gap-3.5">
            <CardTitle className="font-medium truncate max-w-[200px]">
                <Skeleton className="h-6 w-32 bg-white animate-pulse" />
            </CardTitle>
            <CardDescription>
                <Skeleton className="h-3 w-32 bg-white animate-pulse" />
            </CardDescription>
        </CardHeader>
        <CardFooter>
            <div className="flex items-center gap-2 ml-auto">
                <Skeleton className="h-9 w-9 bg-white animate-pulse rounded" />
                <Skeleton className="h-9 w-22 bg-white animate-pulse rounded" />
            </div>
        </CardFooter>
    </Skeleton>
}
