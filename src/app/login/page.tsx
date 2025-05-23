"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { IUser } from "@/types/user"
import { toast } from "sonner"

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
    const { login, loggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.push("/app");
        }
    }, [loggedIn, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-[400px] mx-4">
            <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
                Please sign in to your account
            </CardDescription>
            </CardHeader>
            <CardContent>
            <LoginForm login={login} />
            </CardContent>
        </Card>
        </div>
    )
}

function LoginForm({ login }: { login: (user: IUser, access: string, csrf: string) => void }) {
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

  return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            rules={{
                required: "Email is required",
                pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
                },
            }}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    disabled={isSubmitting}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    disabled={isSubmitting}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Sign In"}
            </Button>
        </form>
        </Form>
    )
}
