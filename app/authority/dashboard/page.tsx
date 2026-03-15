import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from "react-error-boundary"
import { LoaderFive } from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ErrorState } from '@/components/ui/error'
import AuthorityOpenIssue from './_components/authority-open-issue'
import AuthorityClosedIssue from './_components/authority-closed-issue'
import AuthorityEmergencyIssue from './_components/authority-emergency-issue'

const page = () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.issue.getMany.queryOptions())
    void queryClient.prefetchQuery(trpc.issue.getManyClosed.queryOptions())
    void queryClient.prefetchQuery(trpc.issue.getEmergencyIssue.queryOptions())
    return (
        <div>
            <div className='px-4 md:px-12 mt-6'>
                <Button
                    className="group max-w-max text-sm text-red-500"
                    variant={"link"}
                >
                    <span className='underline'>Emergency Issues</span>
                    <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                </Button>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={
                    <div className='flex flex-col items-center justify-center gap-4 py-18'>
                        <LoaderFive text="Loading emergency issues..." />
                    </div>
                }>
                    <ErrorBoundary fallback={
                        <div
                            className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                            <ErrorState />
                        </div>
                    }>
                        <AuthorityEmergencyIssue />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
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
                        <AuthorityOpenIssue />
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
                        <AuthorityClosedIssue />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default page