"use client"
import EmptyState from '@/components/empty';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, MessagesSquare } from 'lucide-react'
import React from 'react'
const OpenIssue = () => {
    const { data, isPending } = authClient.useSession();
    const trpc = useTRPC();

    const { data: issues } = useSuspenseQuery(trpc.postIssue.getMany.queryOptions());
    if (isPending || !data?.user) {
        return null
    }

    return (
        <div className='my-8 px-4 md:px-12'>


            {issues.length === 0 ? (
                <div className='flex flex-col items-center justify-center gap-4 py-12'>
                    <EmptyState />
                    <p className='mt-4 text-sm text-center'>No open issues found. Be the first to report an issue in your area!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {issues.map((issue) => (
                        <div key={issue.id} className='border rounded-lg p-4 bg-white dark:bg-[#121212]'>
                            {/* // Header part */}
                            <div className='flex flex-row justify-between items-center md:col-span-2'>
                                <div className='flex flex-row items-center gap-2 text-sm md:text-base '>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={data.user.image || ''}
                                            alt={data.user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {data.user.name?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {data.user.name}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            <p className="text-xs text-muted-foreground truncate">{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true, })}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center gap-3 text-sm md:text-base '>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>
                                                <Button className={`rounded-md ${issue.status === "open" ? " text-yellow-500 border-yellow-500 bg-yellow-200 dark:bg-yellow-800/30   " :
                                                    issue.status === "assigned" ? "text-blue-500 bg-blue-200 dark:bg-blue-800/30 border-blue-500" :
                                                        issue.status === "resolved" ? "text-green-500 bg-green-200 dark:bg-green-800/30 border-green-500" :
                                                            "text-red-500 bg-red-200 dark:bg-red-800/30 border-red-500"
                                                    }`}
                                                >
                                                    <p>{issue.status}</p>
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Status</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>
                                                <Button className='cursor-pointer rounded-md text-green-500 border-green-500 bg-green-200 dark:bg-green-800/30'>
                                                    <MessagesSquare />
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Message to authority</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className='cursor-pointer rounded-md text-red-500 border-red-500 bg-red-200 dark:bg-red-800/30'>
                                                {issue.priority_score}%
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Priority Score</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>
                            {/* // Title and description */}

                            <div className='mt-6 gap-2 flex flex-col'>
                                <h2 className="text-sm font-medium truncate">{issue.title}</h2>
                                <p
                                    className="text-muted-foreground text-xs"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {issue.describe_issue}
                                </p>
                            </div>

                            {/* // For more */}
                            <div className="flex justify-end">
                                <Button variant={"link"} className='group mt-4 text-sm cursor-pointer'>
                                    <span className='underline'>View Details</span>
                                    <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }


        </div>
    )
}

export default OpenIssue
