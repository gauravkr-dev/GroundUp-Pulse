import React from 'react'
import Chat from './_components/citizen-chat-page-view'

interface pageProps {
    params: Promise<{ id: string }>
}
const page = async (props: pageProps) => {
    const { id } = await props.params;
    return (
        <div>
            <Chat issueId={id} />
        </div>
    )
}

export default page
