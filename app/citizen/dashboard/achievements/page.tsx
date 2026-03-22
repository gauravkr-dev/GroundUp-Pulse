import React from 'react'
import AchievementPageView from './_components/achievement-page-view'
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
            <AchievementPageView />
        </div>
    )
}

export default page
