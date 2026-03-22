import React from 'react'
import AuthorityChat from './_components/authority-chat-page-view';
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

    if (!session || session.user.role !== "authority") {
        redirect("/")
    }

    const { id } = await props.params;
    return (
        <div>
            <AuthorityChat issueId={id} />
        </div>
    )
}

export default page
