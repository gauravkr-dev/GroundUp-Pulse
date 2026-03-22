"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, CircleCheckBig, Landmark, MapPin, MessagesSquare, Minus, ShieldBan } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import IssueMap from './issue-map-detail';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import RejectedCard from '@/components/rejected-card';
import ResolvedCard from '@/components/resolved-card';

interface DetailIssueViewProps {
    id: string;
}

const DetailIssueView = ({ id }: DetailIssueViewProps) => {
    const { data, isPending } = authClient.useSession();
    const trpc = useTRPC();
    const { data: issue } = useSuspenseQuery(trpc.postIssue.getOne.queryOptions({ id }));
    const { data: unreadInnsues } = useSuspenseQuery(
        trpc.message.getUnreadIssues.queryOptions({
            role: "citizen"
        })
    )
    if (isPending || !data?.user) {
        return null
    }
    return (
        <>
            <div className='px-4 md:px-24 mt-6 mb-12'>
                <div className='border rounded-lg p-4 bg-white dark:bg-[#121212] flex flex-col md:px-6'>

                    {/* // Header part */}
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
                        <div className='flex flex-row items-center gap-3 text-sm md:text-base '>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <Button className="rounded-md" variant={"outline"}>
                                            <p className='flex items-center gap-2'>
                                                {issue.status === "resolved" ? <CircleCheckBig className="text-green-500 inline-block" /> : issue.status === "rejected" ? <ShieldBan className="text-red-500 inline-block" /> :
                                                    issue.status === "assigned" ?
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
                                    <p>Message to Authority</p>
                                </TooltipContent>
                            </Tooltip>
                            {issue.emergency ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button className='cursor-pointer rounded-md text-red-500' variant={"outline"}>
                                            <p className="text-lg">🔥</p>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Emergency</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
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
                            )}
                        </div>

                    </div>
                    {/* // Title and description */}
                    <div className='mt-6 gap-5 flex flex-col'>
                        <h2 className="text-[16px] font-medium">{issue.title}</h2>
                        <p className="text-sm flex flex-row gap-2 items-start">
                            <Minus className="size-5" />
                            {issue.describe_issue}
                        </p>
                        <div className='flex flex-row items-start text-sm gap-2'>
                            <Landmark className="size-5 text-blue-500" />
                            <span className='ml-1 text-sm '>{issue.department}</span>
                        </div>

                    </div>
                    {/* // Image */}


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {issue.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt="rejection"
                                width={300}
                                height={200}
                                className="w-full h-full object-cover rounded-lg border hover:scale-105 transition cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
                <div className='border rounded-lg p-4 bg-white dark:bg-[#121212] flex flex-col md:px-6 mt-6'>
                    <div className="flex md:flex-row flex-col justify-between mt-4 gap-6 mb-4">
                        <Link
                            href={`https://www.google.com/maps?q=${issue.latitude},${issue.longitude}`}
                            target="_blank"
                            className="group flex items-center"
                        >
                            <Button variant={"outline"} className="flex items-center gap-2 cursor-pointer rounded-md">
                                <span>
                                    <Image
                                        src="/google_map.svg"
                                        alt="Google Maps"
                                        width={28}
                                        height={28}
                                        className="object-contain"
                                    />
                                </span>
                                Open in Google Maps
                            </Button>
                        </Link>
                        <div className='flex flex-row items-start text-sm gap-2'>
                            <MapPin className="size-5 text-green-500" />
                            <span className='ml-1 text-sm '>{issue.address}</span>
                        </div>

                    </div>
                    {/* // Map */}
                    <div className="mt-4 w-full h-[40vh] md:h-[70vh] rounded-xl overflow-hidden border">
                        <IssueMap lat={issue.latitude} lng={issue.longitude} />
                    </div>
                </div>

            </div>
            <div className='mx-4 md:mx-24 mt-6 mb-12 bg-white dark:bg-[#121212]'>
                {issue.status === "rejected" && (
                    <RejectedCard
                        reason={issue.rejectReason || "No reason provided"}
                        images={issue.rejectImages || []}
                        rejectedBy={issue.rejectedBy || "Unknown"}
                        rejectedAt={issue.rejectedAt ? new Date(issue.rejectedAt) : new Date()}
                    />
                )}

                {issue.status === "resolved" && (
                    <ResolvedCard
                        comment={issue.resolveComment || "No comment provided"}
                        images={issue.resolveImages || []}
                        resolvedBy={issue.resolvedBy || "Unknown"}
                        resolvedAt={issue.resolvedAt ? new Date(issue.resolvedAt) : new Date()}
                    />
                )}
            </div>
        </>
    )
}

export default DetailIssueView
