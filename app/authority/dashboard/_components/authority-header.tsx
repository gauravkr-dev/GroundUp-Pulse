"use client"
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { authClient } from '@/lib/auth-client';
import { LogOut, StarIcon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const AuthorityHeader = () => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const [scrolled, setScrolled] = useState(false);
    const { data, isPending } = authClient.useSession();



    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);



    if (isPending || !data?.user) {
        return (
            <>
                <div className={`fixed top-0 left-0 z-20 w-full transition-all duration-300 backdrop-blur-sm ${scrolled ? 'border-b' : 'border-b-0'}`}>
                    <div className="flex flex-row justify-between items-center px-4 md:px-12 my-2">
                        <Skeleton className="h-14 w-32 rounded-md" />
                        <div className='flex flex-row items-center gap-4 md:gap-8'>
                            <div className='flex flex-row items-center gap-4 text-sm md:text-base '>
                                {isMobile ? (
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                ) : (
                                    <Skeleton className="h-8 w-32 rounded-full" />
                                )}
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            <Skeleton className="h-9 w-9 rounded-full" />
                        </div>
                    </div>

                </div>
            </>
        )
    }

    const handleSignOut = () => authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push("/");
                toast.success("Successfully signed out!");
            }

        }
    })



    return (
        <div className={`fixed top-0 left-0 z-20 w-full transition-all duration-300 backdrop-blur-sm ${scrolled ? 'border-b' : 'border-b-0'}`}>
            <div className="flex flex-row justify-between items-center px-4 md:px-12 my-2">
                <div>
                    <Link href="/authority/dashboard" className='cursor-pointer'>
                        <Image src="/groundup_pulse2.png" alt="GroundUp Pulse Logo" width={120} height={80} />
                    </Link>
                </div>
                <div className='flex flex-row items-center gap-4 md:gap-8'>
                    <div className='flex flex-row items-center gap-4 text-sm md:text-base '>
                        {isMobile ? (
                            <Link href="/citizen/achievements" className="rounded-full flex items-center justify-center p-1.5 size-8  cursor-pointer bg-white-500 text-black-500 border border hover:bg-muted hover:text-foreground">
                                <StarIcon className="text-yellow-500" />
                            </Link>
                        ) : (
                            <Link href="/citizen/achievements" className="">
                                <Button className='gap-2 rounded-full dark:bg-black-500 cursor-pointer' variant={"outline"}>
                                    <StarIcon className="text-yellow-500" />
                                    <span>Achievement</span>
                                </Button>
                            </Link>
                        )}
                        <ThemeTogglerButton className="rounded-full size-8 cursor-pointer bg-white-500 text-black-500 border border hover:bg-muted hover:text-foreground" />
                    </div>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <button type="button" className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={data.user.image || ''}
                                        alt={data.user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {data.user.name?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={"bottom"}
                            align="end"
                            sideOffset={1}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
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
                                            {data.user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="text-red-600 hover:text-red-600 cursor-pointer gap-2"
                                    onClick={handleSignOut}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default AuthorityHeader
