"use client"
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { openGoogleLogin } from "@/services/loginGoogle";
import { Control, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "@/services/auth";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { IUser } from "@/types/user";

export default function RegisterWrapper() {
    return <Suspense fallback={<FormSkeleton />}>
        <FormWithAuthCheck />
    </Suspense>
}

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPswd: string;
}

function FormWithAuthCheck(){
    const { login, loggedIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get('redirect');
    const path = useMemo(() => typeof redirectParam === "string" ? redirectParam : '/', [redirectParam]);
        
    useEffect(() => {
        if (loggedIn){
            router.push(path);
        }
    }, [loggedIn, path, router]);

    return <RegisterForm login={login} />;
}

function RegisterForm({ login }: {
    login: (user: IUser, access: string, csrf: string) => void 
}){
    const [mode, setMode] = useState<number>(0);

    const form = useForm<RegisterFormValues>({
        defaultValues: { name: "", email: "", password: "", confirmPswd: "" },
        mode: "onSubmit",
    })
    const onSubmit = useCallback(async (data: RegisterFormValues) => {
        if(mode === 0){
            setMode(1);
            return;
        }
        if(data.password !== data.confirmPswd){
            toast("Please enter matching passwords.")
            return;
        }
        const authData = await registerUser({ name: data.name, email: data.email, password: data.password });
        if(authData)
            login(authData.user, authData.accessToken, authData.csrfToken);
    }, [mode]);
    return <div className={"flex flex-col gap-6"}>
        <Card>
            <CardHeader className="text-center py-2">
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your email and create password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                { mode === 0 && <EmailForm control={form.control} /> }
                                { mode === 1 && <PasswordForm control={form.control} /> }
                                <Button type="submit" className="w-full">{ mode == 0 ? 'Continue' : 'Register' }</Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">or continue with</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Button type="button" variant="outline" className="w-full font-normal" onClick={openGoogleLogin}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/></svg>
                                    <span>Continue with Google</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                <p>Already have an account?&nbsp;
                                    <Link href="/auth/login" className="text-primary">Login</Link>
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

function EmailForm({ control }: {
    control: Control<RegisterFormValues>
}){
    return <>
        <FormField control={control} name="name" rules={{ required: "Name is required" }}
            render={({ field }) => (
                <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>Name</FormLabel>
                    </div>
                    <FormControl>
                        <Input type="name" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField control={control} name="email"
            rules={{ required: "Email is required", pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
            }, }} render={({ field }) => (
                <FormItem>
                    <div className="flex">
                        <FormLabel>Email</FormLabel>
                    </div>
                    <FormControl>
                        <Input type="text" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </>
}

function PasswordForm({ control }: {
    control: Control<RegisterFormValues>
}){
    return <>
        <FormField control={control} name="password" rules={{ required: "Password is required" }}
            render={({ field }) => (
                <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField control={control} name="confirmPswd" rules={{ required: "Password is required" }}
            render={({ field }) => (
                <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>Confirm Password</FormLabel>
                    </div>
                    <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </>
}

function FormSkeleton(){
    return <></>;
}
