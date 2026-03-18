import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Award, BadgeCheck, CircleStar, Flame, ShieldPlus } from 'lucide-react';
import React from 'react'

const ResolutionAchievement = () => {
    const trpc = useTRPC();

    const { data: issues } = useSuspenseQuery(trpc.postIssue.getStats.queryOptions());
    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.resolved_issue_count > 4 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.resolved_issue_count > 4
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 4 ? <BadgeCheck size={28} className='text-green-500' /> : <Award size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Problem Solver</h3>
                    <p
                        className={`text-xs
                            ${issues.resolved_issue_count > 4
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 4 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.resolved_issue_count > 9 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.resolved_issue_count > 9
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 9 ? <BadgeCheck size={28} className='text-green-500' /> : <ShieldPlus size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>City Saver</h3>
                    <p
                        className={`text-xs
                            ${issues.resolved_issue_count > 9
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 9 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.resolved_issue_count > 14 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.resolved_issue_count > 14
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 14 ? <BadgeCheck size={28} className='text-green-500' /> : <CircleStar size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Super Citizen</h3>
                    <p
                        className={`text-xs
                            ${issues.resolved_issue_count > 14
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 14 ? "Unlocked" : "Locked"}
                    </p>
                </div>
                <div
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 ${issues.resolved_issue_count > 19 ? 'bg-white dark:bg-[#121212]' : 'bg-zinc-100 dark:bg-zinc-900/40 opacity-60'}`}
                >
                    <div
                        className={`h-14 w-14 flex items-center justify-center rounded-full mb-3
                            ${issues.resolved_issue_count > 19
                                ? "border border"
                                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 19 ? <BadgeCheck size={28} className='text-green-500' /> : <Flame size={28} className='text-zinc-500' />}
                    </div>

                    <h3 className='text-sm font-medium text-center'>Iron Man</h3>
                    <p
                        className={`text-xs
                            ${issues.resolved_issue_count > 19
                                ? "text-green-500"
                                : "text-zinc-400"
                            }
                            `}
                    >
                        {issues.resolved_issue_count > 19 ? "Unlocked" : "Locked"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ResolutionAchievement
