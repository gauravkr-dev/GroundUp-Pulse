"use client"
import { ArrowLeft, Medal, Ribbon, Trophy } from "lucide-react"
import { Button } from '@/components/ui/button'
import BasicAchievement from './basic-achievement'
import ActivityAchievement from "./activity-achievement"
import ResolutionAchievement from "./resolution-achievement"
import { useRouter } from "next/navigation"

const AchievementPageView = () => {
    const router = useRouter();
    return (
        <div className='px-4 md:px-12 mt-4'>
            <Button
                onClick={() => router.back()}
                className="group max-w-max text-sm py-2 px-3 rounded hover:cursor-pointer"
                variant={"link"}
            >
                <ArrowLeft className='group-hover:-translate-x-1 transition-transform dark:text-foreground' />
                <span className='dark:text-foreground underline'>Back</span>

            </Button>
            <div className='mt-12 mb-4 flex justify-center'>
                <Button
                    className="group max-w-max text-sm text-blue-500"
                    variant={"link"}
                >
                    <Ribbon />
                    <span className='underline'>Basic Achievements</span>
                </Button>
            </div>
            <div className='md:px-24'>
                <BasicAchievement />
            </div>
            <div className='mt-12 mb-4 flex justify-center'>
                <Button
                    className="group max-w-max text-sm text-red-500"
                    variant={"link"}
                >
                    <Medal />
                    <span className='underline'>Activity Based Achievements</span>
                </Button>
            </div>
            <div className='md:px-24'>
                <ActivityAchievement />
            </div>
            <div className='mt-12 mb-4 flex justify-center'>
                <Button
                    className="group max-w-max text-sm text-green-500"
                    variant={"link"}
                >
                    <Trophy />
                    <span className='underline'>Resolution Based Achievements</span>
                </Button>
            </div>
            <div className='md:px-24 mb-8'>
                <ResolutionAchievement />
            </div>
        </div>
    )
}

export default AchievementPageView
