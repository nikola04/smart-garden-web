import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const defaultDevices = 0;
export function DeviceListSkeleton(){
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {[...Array(defaultDevices)].map((_, i) => <DeviceCardSkeleton key={i} />)}
    </div>
}

function DeviceCardSkeleton() {
  return <Skeleton className="flex flex-col py-6 gap-6 rounded-xl">
        <CardHeader className="flex justify-between items-center">
            <CardTitle className="font-medium truncate max-w-[200px]">
                <Skeleton className="h-5 w-32 bg-white animate-pulse" />
            </CardTitle>
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md bg-white animate-pulse" />
                <Skeleton className="h-8 w-8 rounded-md bg-white animate-pulse" />
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-24 bg-white animate-pulse rounded" />
            <Skeleton className="h-4 w-32 bg-white animate-pulse rounded" />
        </CardContent>
    </Skeleton>;
}
