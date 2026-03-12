import React from 'react'
import Header from './_components/header'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <div className='mt-28'>
                {children}
            </div>
        </div>
    )
}

export default Layout
