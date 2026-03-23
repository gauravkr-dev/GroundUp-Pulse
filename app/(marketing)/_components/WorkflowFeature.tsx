"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CircleCheckBig, Dumbbell, FileText, Medal, RocketIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const steps = [
    {
        title: "Report Issue",
        description: "Upload images and describe the problem.",
        images: {
            light: ["/light0101.png", "/light0102.png", "/light0103.png"],
            dark: ["/dark0101.png", "/dark0102.png", "/dark0103.png"],
        },
        icon: <RocketIcon className="size-5 text-primary" />
    },
    {
        title: "Issue Listed",
        description: "Issue becomes visible to related authorities as well as you.",
        images: {
            light: ["/light0201.png", "/light0202.png"],
            dark: ["/dark0201.png", "/dark0202.png"],
        },
        icon: <FileText className="size-5 text-primary" />
    },
    {
        title: "Action Taken",
        description: "Authorities acknowledge and start working on the issue.",
        images: {
            light: ["/light-3.png", "/light-4.png"],
            dark: ["/dark-3.png", "/dark-4.png"],
        },
        icon: <Dumbbell className="size-5 text-primary" />
    },
    {
        title: "Issue Resolved",
        description: "The problem is fixed and citizen gets notified.",
        images: {
            light: ["/light-3.png", "/light-4.png"],
            dark: ["/dark-3.png", "/dark-4.png"],
        },
        icon: <CircleCheckBig className="size-5 text-primary" />
    },
    {
        title: "Reward Earned",
        description: "You earn rewards for reporting issues.",
        images: {
            light: ["/light0501.png", "/light0502.png"],
            dark: ["/dark0501.png", "/dark0502.png"],
        },
        icon: <Medal className="size-5 text-primary" />
    },
];

export default function WorkflowSection() {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);

    // ✅ ALWAYS first
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const currentStep = steps[stepIndex];

    const currentImages =
        currentStep.images[theme as "light" | "dark"] ||
        currentStep.images["light"];

    // ✅ auto image change
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % currentImages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [currentImages]);

    // ✅ AFTER hooks
    if (!mounted) return null;

    const nextStep = () => {
        setStepIndex((prev) => (prev + 1) % steps.length);
        setImageIndex(0);
    };

    const prevStep = () => {
        setStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
        setImageIndex(0);
    };

    return (
        <section id="how-it-works" className="py-12 px-4 md:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
                How It Works
            </h2>
            <p className="text-muted-foreground mb-12"> From reporting to resolution in simple steps </p>

            {/* IMAGE */}
            <div className="max-w-6xl mx-auto mb-6 md:h-[450px] h-[200px] flex items-center justify-center border rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImages[imageIndex]}
                        src={currentImages[imageIndex]}
                        className="h-full object-contain"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                    />
                </AnimatePresence>
            </div>

            <div className="flex flex-col md:flex-row justify-between  gap-6 w-full max-w-6xl mx-auto">
                {/* TEXT */}
                <div className="mb-4 text-left ">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-2 mb-1">
                            {currentStep.icon}
                        </div>
                        <h3 className="text-lg font-medium">
                            {currentStep.title}
                        </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {currentStep.description}
                    </p>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                        {stepIndex + 1} / {steps.length}
                    </span>

                    <button onClick={prevStep} className="p-1 border rounded-full">
                        <ChevronLeft className="size-4" />
                    </button>

                    <button onClick={nextStep} className="p-1 border rounded-full">
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}