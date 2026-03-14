/* eslint-disable react/no-unescaped-entities */
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Award, BadgeCheck } from 'lucide-react';
import React from 'react'

const ActivityAchievement = () => {
    const { data, isPending } = authClient.useSession();
    const trpc = useTRPC();
    const { data: issues } = useSuspenseQuery(trpc.postIssue.getStats.queryOptions());
    if (isPending || !data?.user) {
        return null
    }
    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.create_issue_count > 4 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.create_issue_count > 4
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.create_issue_count > 4 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Active Reporter</h3>
                    <p
                        className={`text-xs
                            ${issues.create_issue_count > 4
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.create_issue_count > 4 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.create_issue_count > 9 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.create_issue_count > 9
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.create_issue_count > 9 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Civic Contributor</h3>
                    <p
                        className={`text-xs
                            ${issues.create_issue_count > 9
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.create_issue_count > 9 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.create_issue_count > 14 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.create_issue_count > 14
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.create_issue_count > 14 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>City Guardian</h3>
                    <p
                        className={`text-xs
                            ${issues.create_issue_count > 14
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.create_issue_count > 14 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.create_issue_count > 19 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.create_issue_count > 19
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.create_issue_count > 19 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>People's Voice</h3>
                    <p
                        className={`text-xs
                            ${issues.create_issue_count > 19
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.create_issue_count > 19 ? "Unlocked" : "Locked"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ActivityAchievement
