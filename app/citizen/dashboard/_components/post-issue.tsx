"use client"
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PostIssue = () => {
    return (
        <>
            <div className='px-4 md:px-12'>
                <div className="flex flex-row items-center justify-center gap-8 mt-4">
                    <Card
                        className="w-full flex flex-row items-center justify-center dark:bg-[#121212] px-4 py-6"
                    >
                        <CardHeader className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-8">
                            <CardTitle className="text-2xl font-medium font-serif">
                                Spot an Issue? Report It Instantly.
                            </CardTitle>
                            <CardDescription className="text-sm">
                                Describe a problem in your area such as <span className="font-bold">road damage</span>, <span className="font-bold">water leakage</span>, <span className="font-bold">electricity issues</span>, <span className="font-bold">sanitation problems</span> or <span className="font-bold">any civic issue</span>. Your report will be reviewed and forwarded to the relevant authorities.
                            </CardDescription>

                            <Link href="/citizen/dashboard/post-issue" className="">
                                <Button
                                    className="group w-32 bg-primary text-primary-foreground text-sm py-2 px-3 rounded hover:cursor-pointer hover:bg-primary/90"
                                >
                                    <span className='dark:text-foreground'>Post an issue</span>
                                    <ArrowRight className='group-hover:translate-x-1 transition-transform dark:text-foreground' />
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardHeader className="w-1/2 flex items-center justify-center hidden md:flex gap-4">
                            <Image src="/post_issue3.svg" alt="Interview Header" width={220} height={100} />
                            <Image src="/post_issue2.svg" alt="Interview Header" width={250} height={100} />
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default PostIssue
