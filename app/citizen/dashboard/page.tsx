import React, { Suspense } from 'react'
import PostIssue from './_components/post-issue'
import OpenIssue from './_components/open-issue'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from "react-error-boundary"
import { LoaderFive } from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ErrorState } from '@/components/ui/error'
import ClosedIssue from './_components/closed-issue'

const page = () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.postIssue.getMany.queryOptions())
    void queryClient.prefetchQuery(trpc.postIssue.getManyClosed.queryOptions())
    return (
        <div>
            <div className='px-4 md:px-12 mt-6 mb-8'>
                <Button
                    className="group max-w-max text-sm text-blue-500"
                    variant={"link"}
                >
                    <span className='underline'>Post an issue</span>
                    <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                </Button>
            </div>
            <PostIssue />
            <div className='px-4 md:px-12 mt-6'>
                <Button
                    className="group max-w-max text-sm text-yellow-500"
                    variant={"link"}
                >
                    <span className='underline'>View Open Issues</span>
                    <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                </Button>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={
                    <div className='flex flex-col items-center justify-center gap-4 py-18'>
                        <LoaderFive text="Loading open issues..." />
                    </div>
                }>
                    <ErrorBoundary fallback={
                        <div
                            className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                            <ErrorState />
                        </div>
                    }>
                        <OpenIssue />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
            <div className='px-4 md:px-12 mt-6'>
                <Button
                    className="group max-w-max text-sm text-green-500"
                    variant={"link"}
                >
                    <span className='underline'>Closed Issues</span>
                    <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                </Button>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={
                    <div className='flex flex-col items-center justify-center gap-4 py-18'>
                        <LoaderFive text="Loading closed issues..." />
                    </div>
                }>
                    <ErrorBoundary fallback={
                        <div
                            className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                            <ErrorState />
                        </div>
                    }>
                        <ClosedIssue />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default page