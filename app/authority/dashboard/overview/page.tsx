import React from 'react'
import PartOne from './_components/part-one'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import PartTwo from './_components/part-two'

const page = () => {
    return (
        <div className='px-4 md:px-12'>
            <Link href="/authority/dashboard" className="mt-6">
                <Button
                    className="group max-w-max text-sm py-2 px-3 rounded hover:cursor-pointer"
                    variant={"link"}
                >
                    <ArrowLeft className='group-hover:-translate-x-1 transition-transform dark:text-foreground' />
                    <span className='dark:text-foreground underline'>Back</span>

                </Button>
            </Link>
            <PartOne />
            <PartTwo />
        </div>
    )
}

export default page
