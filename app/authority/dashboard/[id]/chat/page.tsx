import React from 'react'
import AuthorityChat from './_components/authority-chat-page-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '@/components/ui/error';

interface pageProps {
    params: Promise<{ id: string }>
}
const page = async (props: pageProps) => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "authority") {
        redirect("/")
    }

    const { id } = await props.params;

    const queryClient = getQueryClient();
    void await queryClient.prefetchQuery(trpc.message.getMessages.queryOptions({ issueId: id }))
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ErrorBoundary fallback={
                    <div
                        className='px-4 md:px-12 text-center justify-center flex mt-32 text-red-500'>
                        <ErrorState />
                    </div>
                }>
                    <AuthorityChat issueId={id} />
                </ErrorBoundary>

            </HydrationBoundary>
        </div>
    )
}

export default page
