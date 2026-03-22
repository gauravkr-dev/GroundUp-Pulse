import React from 'react'
import PartOne from './_components/part-one'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PartTwo from './_components/part-two'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState } from '@/components/ui/error'

const page = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "authority") {
        redirect("/")
    }

    const queryClient = getQueryClient();
    void await queryClient.prefetchQuery(trpc.authority.user.queryOptions());
    void await queryClient.prefetchQuery(trpc.issue.getStats.queryOptions());
    void await queryClient.prefetchQuery(trpc.authority.users.queryOptions());
    return (
        <div className='px-4 md:px-12'>
            <Link href="/authority/dashboard" className="mt-6">
                <Button
                    className="group max-w-max text-sm py-2 px-3 rounded hover:cursor-pointer"
                    variant={"link"}
                >
                    <ArrowLeft className='group-hover:-translate-x-1 transition-transform dark:text-foreground' />
                    <span className='dark:text-foreground underline'>Back</span>

                </Button>
            </Link>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ErrorBoundary fallback={
                    <div
                        className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                        <ErrorState />
                    </div>
                }>
                    <PartOne />
                </ErrorBoundary>
            </HydrationBoundary>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ErrorBoundary fallback={
                    <div
                        className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                        <ErrorState />
                    </div>
                }>
                    <PartTwo />
                </ErrorBoundary>
            </HydrationBoundary>
        </div>
    )
}

export default page
