import { Skeleton } from "@/components/ui/skeleton";

function LoginFormSkeleton() {
    return <div className="flex flex-col gap-6">
        <div className="bg-card px-4 py-6 shadow rounded-xl">
            <div className="flex flex-col gap-2 text-center py-2">
                <Skeleton className="mx-auto mb-2 h-6 w-40 rounded" />
                <Skeleton className="mx-auto h-4 w-64 rounded" />
            </div>

            <div className="space-y-6 mt-4">
                <div className="space-y-6">
                    {/* Email label and input */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-20 rounded" />
                        <Skeleton className="h-9 rounded" />
                    </div>
                    {/* Password label and input */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <Skeleton className="h-5 w-24 rounded" />
                            <Skeleton className="h-4 w-32 rounded" />
                        </div>
                        <Skeleton className="h-9 rounded" />
                    </div>

                    {/* Submit button */}
                    <Skeleton className="h-9 w-full rounded" />
                </div>

                {/* Divider with text */}
                <div className="relative text-center text-sm text-muted-foreground after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
                    <div className="relative z-10 bg-background px-2 w-36 h-4 rounded mx-auto" />
                </div>

                {/* Social buttons */}
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                </div>

                {/* Signup text */}
                <div className="text-center text-sm">
                    <Skeleton className="h-4 w-48 rounded mx-auto" />
                </div>
            </div>
        </div>
        {/* Terms of Service skeleton */}
        <div className="flex flex-col">
            <Skeleton className="h-4 w-48 rounded mx-auto" />
            <Skeleton className="h-4 w-48 rounded mx-auto" />
        </div>
    </div>
}

export default LoginFormSkeleton
