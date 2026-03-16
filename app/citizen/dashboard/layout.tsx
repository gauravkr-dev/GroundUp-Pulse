import React from 'react'
import CitizenHeader from './_components/citizen-header'
interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <CitizenHeader />
            <div className='mt-24'>
                {children}
            </div>
        </div>
    )
}

export default Layout
