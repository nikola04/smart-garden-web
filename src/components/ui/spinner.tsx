import { cn } from "@/lib/utils"
import { LoaderCircle, type LucideProps } from "lucide-react"

function Spinner({ className, ...props }: LucideProps) {
    return <div>
        <LoaderCircle className={cn("transition-all animate-spin", className)} {...props} />
    </div>
}

export default Spinner
