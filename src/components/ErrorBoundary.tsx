import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Button } from "./ui/button";

export function ErrorBoundary() {
    const navigate = useNavigate()
    const error = useRouteError()

    const handleGoHome = () => navigate("/")

    if (!isRouteErrorResponse(error))
        return <UnknownError error={error} />

    return <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-white text-gray-800 px-4 text-center">
        <h1 className="text-[7rem] font-extrabold leading-none tracking-tight">{ error.status }</h1>
        <h2 className="text-3xl font-semibold mb-4">{error.statusText || "Error"}</h2>
        <div className="py-4">
            { error.data && <p className="text-sm text-gray-600 max-w-xl">{error.data}</p> }
            <Button variant="link" className="cursor-pointer" onClick={handleGoHome}>Go Home</Button>
        </div>
    </div>
}

function UnknownError({ error }: {
    error: unknown
}) {
    const navigate = useNavigate()

    const handleGoHome = () => navigate("/")

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">Unknown error</h2>
            <p className="text-lg text-gray-600 max-w-xl">
                {(error as Error)?.message || "Unknown."}
                <Button variant="link" className="cursor-pointer" onClick={handleGoHome}>Go Home</Button>
            </p>
        </div>
    );
}
