import React from 'react'
import AchievementPageView from './_components/achievement-page-view'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '@/components/ui/error';

const page = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "citizen") {
        redirect("/")
    }

    const queryClient = getQueryClient();
    void await queryClient.prefetchQuery(trpc.postIssue.getStats.queryOptions());
    void await queryClient.prefetchQuery(trpc.postIssue.getStats.queryOptions());
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ErrorBoundary fallback={
                    <div
                        className='px-4 md:px-12 text-center justify-center flex mt-32 text-red-500'>
                        <ErrorState />
                    </div>
                }>
                    <AchievementPageView />
                </ErrorBoundary>
            </HydrationBoundary>

        </div>
    )
}

export default page
