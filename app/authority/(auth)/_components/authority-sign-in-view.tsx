/* eslint-disable react/no-unescaped-entities */
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
import { Spinner } from '@/components/ui/spinner'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export default function AuthoritySignInView() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setPending(true);
        setError(null);
        authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    toast.success('Signed in successfully!');
                    setPending(false);
                    router.push('/authority/dashboard');
                },
                onError: (error) => {
                    toast.error(error.error.message || 'Sign-in failed. Please try again.');
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
                        <p className="text-sm mt-6">Welcome back! sign In to your account.</p>
                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-5">
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
                    <Button disabled={pending} className="w-full mt-4 cursor-pointer" type="submit">{pending ? <span className="flex items-center flex-row justify-center gap-1"><Spinner />Signing In...</span> : 'Sign In'}</Button>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account?{' '}
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/authority/sign-up">Create an account</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}