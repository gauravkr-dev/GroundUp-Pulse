import React from 'react'
import PostIssueView from './_components/post-issue-view'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "citizen") {
        redirect("/")
    }

    return (
        <div>
            <PostIssueView />
        </div>
    )
}

export default page
