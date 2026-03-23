"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ClipboardList, Zap, CheckCircle, MessagesSquare, ArrowRightIcon, ChartNoAxesGantt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthoritySection() {
    return (
        <section id="authority" className="w-full py-20 px-6 md:px-18 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-18 items-center">

                {/* LEFT TEXT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-medium mb-6 leading-tight">
                        Tools for Authorities to Act Faster
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        Manage incoming issues efficiently, prioritize critical problems,
                        and communicate directly with citizens for faster resolution.
                    </p>

                    {/* FEATURES */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-5 h-5 text-primary" />
                            <span>View and manage all reported issues</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-primary" />
                            <span>Prioritize urgent cases instantly</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <MessagesSquare className="w-5 h-5 text-primary" />
                            <span>Communicate directly with citizens</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary" />
                            <span>Resolve and update issue status</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link href="/authority/sign-up">
                        <Button className="rounded-md group cursor-pointer mt-12 dark:text-foreground" size="lg">
                            <ChartNoAxesGantt />
                            Manage Issues
                            <ArrowRightIcon className='group-hover:translate-x-1 transition transform' />
                        </Button>
                    </Link>
                </motion.div>

                {/* RIGHT SIDE (UI PREVIEW) */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <Image
                        src="/authority_officers.svg"
                        alt="Post Issue"
                        className=""
                        width={450}
                        height={400}
                    />
                    {/* Glow */}
                    <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-primary rounded-full"></div>
                </motion.div>

            </div>
        </section>
    );
}