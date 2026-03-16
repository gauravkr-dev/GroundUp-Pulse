import React from 'react'
import AuthorityHeader from './_components/authority-header'
interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <AuthorityHeader />
            <div className='mt-24'>
                {children}
            </div>
        </div>
    )
}

export default Layout
