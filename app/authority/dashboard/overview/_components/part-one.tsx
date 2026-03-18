"use client";
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query'
import { CircleCheckBig, Landmark, ShieldBan } from 'lucide-react';
import React from 'react'

const PartOne = () => {
    const trpc = useTRPC();
    const { data: user } = useSuspenseQuery(
        trpc.authority.user.queryOptions()
    );

    const { data: stats } = useSuspenseQuery(
        trpc.issue.getStats.queryOptions()
    )

    return (
        <div>
            <div className='flex flex-row items-center justify-center text-sm gap-2 mt-4 bg-blue-500/20 w-max mx-auto px-4 py-2 rounded'>
                <Landmark className="size-6 text-blue-500" />
                <span className='ml-1 text-lg font-medium'>{user.department}</span>
            </div>
            <p className='text-center font-medium text-sm mt-3'>
                Every issue resolved — builds trust
            </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 md:px-8'>
                <div className='flex flex-col items-center justify-center mt-6 gap-3 border rounded-lg py-4 bg-yellow-500/10'>
                    <span className='text-2xl font-medium'>{stats.opened}</span>
                    <div className='flex flex-row items-center gap-2'>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-block h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
                        </span>
                        <span className='text-sm text-muted-foreground'>Opened</span>
                    </div>

                </div>
                <div className='flex flex-col items-center justify-center mt-6 gap-3 border rounded-lg py-4 bg-blue-500/10'>
                    <span className='text-2xl font-medium'>{stats.assigned}</span>
                    <div className='flex flex-row items-center gap-2'>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-block h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                        </span>
                        <span className='text-sm text-muted-foreground'>Assigned</span>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-6 gap-3 border rounded-lg py-4 bg-green-500/10'>
                    <span className='text-2xl font-medium'>{stats.resolved}</span>
                    <div className='flex flex-row items-center gap-2'>
                        <CircleCheckBig className="text-green-500 inline-block size-4" />
                        <span className='text-sm text-muted-foreground'>Resolved</span>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-6 gap-3 border rounded-lg py-4 bg-red-500/10'>
                    <span className='text-2xl font-medium'>{stats.rejected}</span>
                    <div className='flex flex-row items-center gap-2'>
                        <ShieldBan className="text-red-500 inline-block size-4" />
                        <span className='text-sm text-muted-foreground'>Rejected</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartOne
