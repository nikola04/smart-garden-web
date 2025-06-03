"use client"

import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IUser } from "@/types/user"
import { toast } from "sonner"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"
import { openGoogleLogin } from "@/services/loginGoogle"

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginWrapper() {
    return <Suspense fallback={<FormSkeleton />}>
        <FormWithAuthCheck />
    </Suspense>
}

function FormWithAuthCheck() {
    const { login, loggedIn } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get('redirect');
    const loginError = searchParams.get('error');
    const path = useMemo(() => typeof redirectParam === "string" ? redirectParam : '/', [redirectParam]);

    const hasHandledErrorRef = useRef(false);
    useEffect(() => {
        if(!loginError || hasHandledErrorRef.current)
            return;

        if(loginError === "google-not-found")
            toast("Google account not linked.");
        if(loginError === "google-no-code")
            toast("Invalid google login request.")

        hasHandledErrorRef.current = true;

        const newParams = new URLSearchParams(searchParams);
        newParams.delete('error');
        router.replace(pathname + '?' + newParams.toString())
    }, [loginError]);

    useEffect(() => {
        if (loggedIn){
            router.push(path);
        }
    }, [loggedIn, path, router]);

    return <LoginForm login={login}/>
}

function LoginForm({ className, login, ...props} : React.ComponentProps<"div"> & {
    login: (user: IUser, access: string, csrf: string) => void 
}){
      const form = useForm<LoginFormValues>({
        defaultValues: { email: "", password: "" },
        mode: "onSubmit",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true)
        try {
            await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((res) => res.json())
            .then((res) => {
                const { success, message, data } = res;
                if (!success)
                    throw new Error(message);
                const { user, accessToken, csrfToken } = data;
                login(user, accessToken, csrfToken);
            }).catch((error) => {
                toast.error(error.message);
            });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleGoogleLogin = () => {
        openGoogleLogin();
    }
 
    return <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader className="text-center py-2">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                    Login with your email and password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <FormField control={form.control} name="email"
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                        message: "Invalid email address",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <FormItem>
                                        <div className="flex">
                                            <FormLabel>Email</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input
                                            type="text"
                                            placeholder="you@example.com"
                                            {...field}
                                            disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField control={form.control} name="password" rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link href="/forgot_pswd" className="text-xs/1"><span className="text-xs/0 text-primary">Forgot your password?</span></Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting" : "Sign In"}
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">or continue with</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* <Button type="button" variant="outline" className="w-full font-normal">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor" /></svg>
                                    <span>Continue with Apple</span>
                                </Button> */}
                                <Button type="button" variant="outline" className="w-full font-normal" onClick={handleGoogleLogin}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/></svg>
                                    <span>Continue with Google</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <p>Don&apos;t have an account?&nbsp;
                                    <Link href="/auth/register" className="text-primary">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
        </div>
    </div>
}


function FormSkeleton() {
    return <div className="flex flex-col gap-6">
        <div className="bg-card px-4 py-6 rounded-md shadow rounded-xl">
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
