import React, { Suspense } from 'react'
import DetailIssueView from './_components/detail-issue-view'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';
import { LoaderFive } from '@/components/ui/loader';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '@/components/ui/error';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface pageProps {
    params: Promise<{ id: string }>
}
const page = async ({ params }: pageProps) => {

    const { id } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.postIssue.getOne.queryOptions({ id }));
    return (
        <div>
            <Link href="/citizen/dashboard" className="mt-6 px-4 md:px-12">
                <Button
                    className="group max-w-max text-sm py-2 px-3 rounded hover:cursor-pointer"
                    variant={"link"}
                >
                    <ArrowLeft className='group-hover:-translate-x-1 transition-transform dark:text-foreground' />
                    <span className='dark:text-foreground underline'>Back</span>

                </Button>
            </Link>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={
                    <div className='flex flex-col items-center justify-center gap-4 h-[60vh]'>
                        <LoaderFive text="Loading issue details..." />
                    </div>
                }>
                    <ErrorBoundary fallback={
                        <div
                            className='px-4 md:px-12 text-center justify-center flex mt-32 text-red-500'>
                            <ErrorState />
                        </div>
                    }>
                        <DetailIssueView id={id} />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default page
