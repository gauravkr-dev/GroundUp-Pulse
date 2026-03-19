import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowRightIcon, Landmark, RocketIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="mx-auto w-full max-w-5xl" id="hero">
            {/* Top Shades */}
            <div
                aria-hidden="true"
                className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block"
            >
                <div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(40%_70%_at_50%_0%,rgba(59,130,246,0.25),transparent)] contain-strict" />
            </div>

            {/* X Bold Faded Borders */}
            <div
                aria-hidden="true"
                className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block"
            >
                <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-blue-400/20" />
                <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-blue-400/20" />
            </div>

            {/* main content */}

            <div className="relative flex flex-col items-center justify-center gap-5 pt-32 pb-30">
                {/* X Content Faded Borders */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-1 size-full overflow-hidden"
                >
                    <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
                    <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
                    <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
                    <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
                </div>

                <div
                    className={cn(
                        "group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow",
                        "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
                    )}

                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                    </span>
                    <span className="text-xs">For Better Communities!</span>
                    <span className="block h-5 border-l" />

                    {/* <ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" /> */}
                    <div className="group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                            <span className="flex size-6">
                                <ArrowRight className="m-auto size-3" />
                            </span>
                            <span className="flex size-6">
                                <ArrowRight className="m-auto size-3" />
                            </span>
                        </div>
                    </div>
                </div>

                <h1
                    className={cn(
                        "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-2xl md:text-5xl tracking-tight delay-100 duration-500 ease-out sm:text-3xl mt-6",
                        "text-shadow-[0_0px_50px_theme(--color-foreground/.2)]"
                    )}
                >
                    Report Issues. Track Progress.<br /> Build Better Communities.
                </h1>
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-400/10 blur-[100px] rounded-full -z-10" />
                <p className="fade-in slide-in-from-bottom-10 mx-auto max-w-md animate-in fill-mode-backwards text-center text-base text-foreground/80 tracking-wider delay-200 duration-500 ease-out sm:text-lg md:text-xl text-sm px-6 md:px-0 mt-3">
                    GroundUp Pulse connects citizens with authorities for faster issue resolution.
                </p>

                <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-8 fill-mode-backwards pt-2 delay-300 duration-500 ease-out px-6 md:px-0 mt-6">
                    <Link href="/citizen/sign-up">
                        <Button className="rounded-md group cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]" size="lg" variant="outline">
                            <RocketIcon />
                            Report an Issue
                            <ArrowRightIcon className='group-hover:translate-x-1 transition transform' />
                        </Button>
                    </Link>

                    <Link href="/authority/sign-up">
                        <Button className="rounded-md group cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]" size="lg" variant="outline">
                            <Landmark />
                            For Authorities
                            <ArrowRightIcon className='group-hover:translate-x-1 transition transform' />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
