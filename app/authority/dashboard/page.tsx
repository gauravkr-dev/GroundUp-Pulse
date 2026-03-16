import React from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '@/trpc/server'
import { ErrorBoundary } from "react-error-boundary"
import { ErrorState } from '@/components/ui/error'
import AuthorityTabs from './_components/authority-tabs'

const page = () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.issue.getMany.queryOptions())
    void queryClient.prefetchQuery(trpc.issue.getManyClosed.queryOptions())
    void queryClient.prefetchQuery(trpc.issue.getEmergencyIssue.queryOptions())
    return (
        <div className=''>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ErrorBoundary fallback={
                    <div
                        className='px-4 md:px-12 text-center justify-center flex mt-18 text-red-500'>
                        <ErrorState />
                    </div>
                }>
                    <AuthorityTabs />
                </ErrorBoundary>

            </HydrationBoundary>
        </div>
    )
}

export default page