"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler'
import Link from 'next/link'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section id="navbar">
            <div className={`fixed top-0 left-0 z-20 w-full transition-all duration-300 backdrop-blur-sm ${scrolled ? 'border-b' : 'border-b-0'}`}>
                <div className="flex flex-row justify-between items-center px-4 md:px-12 my-2">
                    <div>
                        <Link href="#hero" className='cursor-pointer'>
                            <Image src="/groundup_pulse2.png" alt="GroundUp Pulse Logo" width={120} height={80} />
                        </Link>
                    </div>
                    <div className='flex flex-row items-center gap-4 md:gap-8'>
                        <div className='flex flex-row items-center gap-4 text-sm md:text-base '>
                            <ThemeTogglerButton className="rounded-full size-8 cursor-pointer bg-white-500 text-black-500 border border hover:bg-muted hover:text-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar
