import React from 'react'
import Chat from './_components/citizen-chat-page-view'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

interface pageProps {
    params: Promise<{ id: string }>
}
const page = async (props: pageProps) => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "citizen") {
        redirect("/")
    }

    const { id } = await props.params;
    return (
        <div>
            <Chat issueId={id} />
        </div>
    )
}

export default page
