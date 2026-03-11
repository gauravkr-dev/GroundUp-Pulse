/* eslint-disable @next/next/no-img-element */
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
// use a plain <img> to avoid Next Image SSR/CSR attribute mismatches in client components
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export default function SignUpView() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setPending(true);
        setError(null);
        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    router.push('/dashboard');
                    toast.success('Account created successfully!');
                    setPending(false);
                },
                onError: (error) => {
                    toast.error(error.error.message || 'Sign-up failed. Please try again.');
                    setPending(false);
                }
            }
        )
    }
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-card m-auto h-fit w-full max-w-lg rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="px-8 pb-6">
                    <div>
                        <div className="flex flex-col items-center mt-6">
                            <Link href="/" aria-label="go home">
                                <img
                                    src="/groundup_pulse2.png"
                                    alt="GroundUp Pulse Logo"
                                    width={200}
                                    height={180}
                                    className="block"
                                />
                            </Link>
                        </div>
                        <p className="text-sm mt-6">Welcome! Create an account to get started</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <Button
                            onClick={() => {
                                setSocialLoading(true);
                                authClient.signIn.social({
                                    provider: "google"
                                })
                            }}
                            type="button"

                            className='cursor-pointer'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262">
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span className='text-white'>{socialLoading ? "Signing up..." : "Sign up with Google"}</span>
                        </Button>

                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-5">
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>

                            <Input
                                id="name"
                                {...form.register("name")}
                                aria-invalid={form.formState.errors.name ? true : false}
                                className='border border-primary'
                            />

                            {form.formState.errors.name && (
                                <FieldError>
                                    {form.formState.errors.name.message}
                                </FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>

                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                aria-invalid={form.formState.errors.email ? true : false}
                                className='border border-primary'
                            />

                            {form.formState.errors.email && (
                                <FieldError>
                                    {form.formState.errors.email.message}
                                </FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>

                            <Input
                                id="password"
                                type="password"
                                {...form.register("password")}
                                aria-invalid={form.formState.errors.password ? true : false}
                                className='border border-primary'
                            />

                            {form.formState.errors.password && (
                                <FieldError>
                                    {form.formState.errors.password.message}
                                </FieldError>
                            )}
                        </Field>
                    </div>
                    <Button disabled={pending} className="w-full mt-4 cursor-pointer" type="submit">{pending ? 'Signing Up...' : 'Sign Up'}</Button>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/citizen/sign-in">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}