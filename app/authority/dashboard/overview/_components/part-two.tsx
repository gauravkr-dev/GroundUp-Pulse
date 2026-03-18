"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Users } from 'lucide-react';
import React from 'react'

const PartTwo = () => {

    const trpc = useTRPC();

    const { data: users } = useSuspenseQuery(
        trpc.authority.users.queryOptions()
    )

    return (
        <div>
            <div className='flex flex-row items-center justify-center text-sm gap-2 mt-24 mb-6 bg-blue-500/20 w-max mx-auto px-3 py-1 rounded'>
                <Users className="size-5 text-blue-500" />
                <span className='ml-1 text-lg font-medium'>Our Team</span>
            </div>
            <Table className='border centered min-w-[600px] mb-12'>
                <TableHeader>
                    <TableRow className='bg-muted'>
                        <TableHead></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((member, index) => (
                        <TableRow key={member.id}>
                            <TableCell>
                                {index + 1}.
                            </TableCell>
                            <TableCell className='flex flex-row items-center gap-2'>
                                <button type="button" className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer">
                                    <Avatar className="h-6 w-6 rounded-lg">
                                        <AvatarImage
                                            src={member.image || ''}
                                            alt={member.name}
                                        />
                                        <AvatarFallback className="rounded-lg text-xs">
                                            {member.name?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                                {member.name}
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                                —
                            </TableCell>
                            <TableCell>
                                {format(new Date(member.createdAt), "dd MMM yyyy")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default PartTwo
