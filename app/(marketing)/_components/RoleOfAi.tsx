import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { ShieldCheck, Siren, CopyCheck } from "lucide-react";

type FeatureType = {
    title: string;
    icon: React.ReactNode;
    description: string;
};

export function RoleOfAi() {
    return (
        <section id="role-of-ai">
            <div className="mx-auto px-4 md:px-24 pt-6 pb-12">
                <h2 className="mb-5 text-center font-medium text-2xl md:text-3xl">
                    The Role of AI in GroundUp Pulse
                </h2>

                <div className="relative">
                    {/* Corner Icons */}
                    <DecorIcon
                        className="size-6 stroke-2 stroke-border"
                        position="top-left"
                    />
                    <DecorIcon
                        className="size-6 stroke-2 stroke-border"
                        position="top-right"
                    />
                    <DecorIcon
                        className="size-6 stroke-2 stroke-border"
                        position="bottom-left"
                    />
                    <DecorIcon
                        className="size-6 stroke-2 stroke-border"
                        position="bottom-right"
                    />

                    <DashedLine className="-top-[1.5px] right-3 left-3" />
                    <DashedLine className="top-3 -right-[1.5px] bottom-3" />
                    <DashedLine className="top-3 bottom-3 -left-[1.5px]" />
                    <DashedLine className="right-3 -bottom-[1.5px] left-3" />

                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                className="group [&_svg]:mask-b-from-0% relative p-8 [&_svg]:size-7 [&_svg]:text-primary"
                                key={feature.title}
                            >
                                {feature.icon}
                                <h3 className="font-medium text-lg">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                                <DashedLine className="right-5 bottom-0 left-5 group-last:hidden md:top-5 md:right-0 md:bottom-5 md:left-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function DashedLine({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("absolute border-collapse border border-dashed", className)}
            {...props}
        />
    );
}

const features: FeatureType[] = [
    {
        title: "AI-Powered Issue Verification",
        icon: (
            <ShieldCheck
            />
        ),
        description: "Our AI analyzes uploaded images and descriptions to verify whether a reported issue is genuine.",
    },
    {
        title: "Emergency Detection & Smart Prioritization",
        icon: (
            <Siren
            />
        ),
        description: "Detects emergency situations and assigns priority scores to non-urgent issues.",
    },
    {
        title: "Duplicate Issue Detection",
        icon: (
            <CopyCheck
            />
        ),
        description: "Identifies duplicate reports using location, images, and descriptions.",
    },
];
