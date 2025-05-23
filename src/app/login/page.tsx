"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
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
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    try {
        
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsSubmitting(false)
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
