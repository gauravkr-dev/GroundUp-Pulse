"use client";

import Image from "next/image";

export default function HowItWorks() {
    return (
        <section className="py-20 px-4 bg-background" id="how-it-works">
            <div className="max-w-6xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-medium mb-4">
                    How It Works
                </h2>

                <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-sm">
                    From reporting an issue to getting it resolved, our AI-powered system
                    ensures faster and smarter civic problem handling.
                </p>

                {/* Flow Image */}
                <div className="w-full flex justify-center">
                    <div className="relative w-full">
                        <Image
                            src="/how-it-works.svg"
                            alt="How it works flow diagram"
                            width={1200}
                            height={700}
                            className="w-full h-auto object-contain rounded-xl border"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}