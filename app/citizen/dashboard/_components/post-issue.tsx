"use client"
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const PostIssue = () => {
  return (
    <div className='mt-28 px-4 md:px-12'>
      <div className="flex flex-row items-center justify-center gap-8 mt-4">
                <Card
                    className="w-full flex flex-row items-center justify-center dark:bg-[#121212] px-4 py-6"
                >
                    <CardHeader className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-8">
                        <CardTitle className="text-2xl font-medium font-serif">
                            Spot an Issue? Report It Instantly.
                        </CardTitle>
                        <CardDescription className="text-sm">
                            From broken roads to dirty water — 
capture it, report it, and let AI 
route it to the right authority. 
Your voice drives real change.
                        </CardDescription>

                        <Button
                            className="group w-32 bg-primary text-primary-foreground text-sm py-2 px-3 rounded hover:cursor-pointer hover:bg-primary/90"
                            onClick={() => {
                                
                            }}
                        >
                            Post an issue
                            <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                        </Button>
                    </CardHeader>

                    <CardHeader className="w-1/2 flex items-center justify-center hidden md:flex">
                        <Image src="/post_issue1.svg" alt="Interview Header" width={350} height={100} />
                        <Image src="/post_issue2.svg" alt="Interview Header" width={250} height={100} />
                    </CardHeader>
                </Card>
            </div>
    </div>
  )
}

export default PostIssue
