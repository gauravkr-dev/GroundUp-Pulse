"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Camera, RocketIcon, ArrowRightIcon, ScanBarcode, MessagesSquare, FileChartPie } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CitizenSection() {
    return (
        <section className="w-full py-8 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-18 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-medium mb-6 leading-tight">
                        Empowering Citizens to Raise Their Voice
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        Report issues in your area, track progress in real-time, and stay
                        connected with authorities — all in one place.
                    </p>

                    {/* FEATURES */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Camera className="w-5 h-5 text-primary" />
                            <span>Post an issue with all the details</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <ScanBarcode className="w-5 h-5 text-primary" />
                            <span>Analysis of the issue with AI</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FileChartPie className="w-5 h-5 text-primary" />
                            <span>Track status in real-time</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <MessagesSquare className="w-5 h-5 text-primary" />
                            <span>Chat directly with authorities</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link href="/citizen/sign-up">
                        <Button className="rounded-md group cursor-pointer mt-12 dark:text-foreground" size="lg">
                            <RocketIcon />
                            Start Reporting
                            <ArrowRightIcon className='group-hover:translate-x-1 transition transform' />
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                >

                    <Image
                        src="/post_issue3.svg"
                        alt="Post Issue"
                        className=""
                        width={500}
                        height={400}
                    />
                    {/* Glow Effect */}
                    <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-primary rounded-full"></div>
                </motion.div>
            </div>
        </section>
    );
}