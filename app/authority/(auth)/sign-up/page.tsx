import React from 'react'
import AuthoritySignUpView from '../_components/authority-sign-up-view'

const page = () => {
    return (
        <div className='bg-zinc-50 dark:bg-transparent'>
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 text-sm p-4 rounded-lg mb-4 mx-4 md:mx-24 px-8 mt-12">
                <h3 className='font-bold text-center mb-4'>⚠️ Open Access for Demo:</h3>
                <p className=' mb-4'>
                    This platform allows anyone to create an authority account to explore how the system works.
                    You can view the authority dashboard, understand workflows, and try features like issue assignment, resolution, and communication.
                </p>
                <p className=''>
                    This is intentionally kept open for learning and demonstration purposes only.
                </p>
            </div>
            <AuthoritySignUpView />
        </div>
    )
}

export default page
