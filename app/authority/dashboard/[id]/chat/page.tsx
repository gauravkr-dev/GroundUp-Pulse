import React from 'react'
import AuthorityChat from './_components/authority-chat-page-view';

interface pageProps {
    params: Promise<{ id: string }>
}
const page = async (props: pageProps) => {
    const { id } = await props.params;
    return (
        <div>
            <AuthorityChat issueId={id} />
        </div>
    )
}

export default page
