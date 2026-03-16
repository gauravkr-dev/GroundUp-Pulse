"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, ChevronRight, CircleCheckBig, Landmark, MapPin, MessagesSquare, Minus, ShieldBan } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import Link from 'next/link';
import IssueMap from '@/app/citizen/dashboard/[id]/_components/issue-map-detail';
import { redirect } from 'next/navigation';

interface AuthorityDetailIssueViewProps {
    id: string;
}

const AuthorityDetailIssueView = ({ id }: AuthorityDetailIssueViewProps) => {
    const { data, isPending } = authClient.useSession();
    const [currentImage, setCurrentImage] = useState(0)
    const trpc = useTRPC();
    const { data: issue } = useSuspenseQuery(trpc.issue.getOne.queryOptions({ id }));

    if (isPending || !data?.user) {
        return null
    }
    const nextImage = () => {
        setCurrentImage((prev) =>
            prev === issue.images.length - 1 ? 0 : prev + 1
        )
    }
    return (
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
                                <div>
                                    <Button className='cursor-pointer rounded-md' variant={"outline"} onClick={() => {
                                        redirect(`/authority/dashboard/${id}/chat`)
                                    }}>
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
                                <Button className='cursor-pointer rounded-md text-red-500' variant={"outline"}>
                                    {issue.emergency ? <p className="text-lg">🔥</p> : `${issue.priority_score}%`}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {issue.emergency ? <p>Emergency</p> : <p>Priority Score</p>}
                            </TooltipContent>
                        </Tooltip>
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


                <div className="relative mt-12 md:mt-18 w-full">

                    <Image
                        src={issue.images[currentImage]}
                        alt="issue image"
                        width={1600}
                        height={900}
                        className="w-full h-auto object-contain object-center rounded-xl border bg-gray-50 dark:bg-[#0b0b0b]"
                    />

                    {/* NEXT IMAGE BUTTON */}
                    {issue.images.length > 1 && (
                        <Button
                            onClick={nextImage}
                            className="
                                        absolute right-3 top-1/2 -translate-y-1/2
                                        cursor-pointer
                                       rounded-md
                                        shadow-md
                                        hover:scale-110
                                        transition
        "
                        >
                            <ChevronRight className="size-5 dark:text-foreground" />
                        </Button>
                    )}

                </div>
                <div className="flex md:flex-row flex-col justify-between mt-12 md:mt-18 gap-4">
                    <Link
                        href={`https://www.google.com/maps?q=${issue.latitude},${issue.longitude}`}
                        target="_blank"
                        className="group flex items-center justify-end"
                    >
                        <span>
                            <Image
                                src="/google_map.svg"
                                alt="Google Maps"
                                width={28}
                                height={28}
                                className="object-contain"
                            />
                        </span>
                        <span className="underline text-sm">Open in Google Maps</span>
                        <span> <ArrowRight className="group-hover:translate-x-1 transition-transform size-4 ml-1" /> </span>
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
    )
}

export default AuthorityDetailIssueView
