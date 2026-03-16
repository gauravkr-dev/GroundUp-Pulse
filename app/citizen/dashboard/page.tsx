import React from 'react'
import PostIssue from './_components/post-issue'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from "react-error-boundary"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { ErrorState } from '@/components/ui/error'
import CitizenTabs from './_components/citizen-tabs'

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

            <HydrationBoundary state={dehydrate(queryClient)}>
                <ErrorBoundary fallback={
                    <div
                        className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                        <ErrorState />
                    </div>
                }>
                    <CitizenTabs />
                </ErrorBoundary>
            </HydrationBoundary>
        </div>
    )
}

export default page