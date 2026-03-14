import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Award, BadgeCheck } from 'lucide-react';
import React from 'react'

const BasicAchievement = () => {
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
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${data?.user ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${data?.user
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {data?.user ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Welcome Citizen</h3>
                    <p
                        className={`text-xs
                            ${data?.user
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {data?.user ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.create_issue_count > 0 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.create_issue_count > 0
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.create_issue_count > 0 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>First Voice</h3>
                    <p
                        className={`text-xs
                            ${issues.create_issue_count > 0
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.create_issue_count > 0 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.create_issue_count > 0 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.create_issue_count > 0
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.create_issue_count > 0 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Watchful Eye</h3>
                    <p
                        className={`text-xs
                            ${issues.create_issue_count > 0
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.create_issue_count > 0 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.resolved_issue_count > 0 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.resolved_issue_count > 0
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 0 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Local Guardian</h3>
                    <p
                        className={`text-xs
                            ${issues.resolved_issue_count > 0
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 0 ? "Unlocked" : "Locked"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BasicAchievement
