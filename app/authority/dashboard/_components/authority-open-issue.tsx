"use client"
import EmptyState from '@/components/empty';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, MessagesSquare } from 'lucide-react'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
const AuthorityOpenIssue = () => {

    const trpc = useTRPC();

    const { data: issues } = useSuspenseQuery(trpc.issue.getMany.queryOptions());

    const { data: unreadInnsues } = useSuspenseQuery(
        trpc.message.getUnreadIssues.queryOptions({
            role: "authority"
        })
    )
    return (
        <div className='my-8 px-4 md:px-12'>


            {issues.length === 0 ? (
                <div className='flex flex-col items-center justify-center gap-4 min-h-[50vh]'>
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
                                            src={issue?.user?.image || ''}
                                            alt={issue?.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {issue?.user?.name?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {issue?.user?.name}
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
                                                <Button className="rounded-md" variant={"outline"}>
                                                    <p className='flex items-center gap-2'>
                                                        {issue.status === "assigned" ?
                                                            <span className="relative flex h-3 w-3">
                                                                <span className="animate-ping absolute inline-block h-full w-full rounded-full bg-primary opacity-75"></span>
                                                                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                                                            </span> :
                                                            <span className="relative flex h-3 w-3">
                                                                <span className="animate-ping absolute inline-block h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                                                                <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
                                                            </span>
                                                        }
                                                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                    </p>
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Status</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="relative">
                                                <Button
                                                    className={`cursor-pointer rounded-md relative transition-all duration-200
                                                                                        ${unreadInnsues.includes(issue.id)
                                                            ? "border-red-500 ring-1 ring-red-500"
                                                            : ""
                                                        }`}
                                                    variant={"outline"}
                                                    onClick={() => {
                                                        redirect(`/citizen/dashboard/${issue.id}/chat`)
                                                    }}
                                                >
                                                    <MessagesSquare />
                                                </Button>

                                                {unreadInnsues.includes(issue.id) && (
                                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                                                )}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Message to Citizen</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className='cursor-pointer rounded-md text-red-500' variant={"outline"}>
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
                                <Link href={`/authority/dashboard/${issue.id}`}>
                                    <Button variant={"link"} className='group mt-4 text-sm cursor-pointer'>
                                        <span className='underline'>View Details</span>
                                        <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }


        </div>
    )
}

export default AuthorityOpenIssue
