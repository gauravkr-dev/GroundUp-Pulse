import { DecorIcon } from "@/components/ui/decor-icon";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqsSection() {
    return (
        <section id="faqs" className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:border-x py-6">
            <div className="px-4 pt-12 pb-6">
                <div className="space-y-5">
                    <h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground">
                        Quick answers to common questions about our platform. Open any question to
                        learn more.
                    </p>
                    <p className="text-muted-foreground">
                        {"Can't find what you're looking for? "}
                        <a className="text-primary hover:underline" href="mailto:gauravkumar803109@gmail.com">
                            Contact Us
                        </a>
                    </p>
                </div>
            </div>
            <div className="relative place-content-center">
                {/* vertical guide line */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-3 h-full w-px bg-border"
                />

                <Accordion
                    className="rounded-none border-x-0 border-y"
                    collapsible
                    type="single"
                >
                    {faqs.map((item) => (
                        <AccordionItem
                            className="group relative pl-5"
                            key={item.id}
                            value={item.id}
                        >
                            <DecorIcon
                                className="left-[13px] size-3 group-last:hidden"
                                position="bottom-left"
                            />

                            <AccordionTrigger className="px-4 py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
                                {item.title}
                            </AccordionTrigger>

                            <AccordionContent className="px-4 pb-4 text-muted-foreground">
                                {item.content}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

const faqs = [
    {
        id: "item-1",
        title: "How does AI verify if an issue is real?",
        content:
            "Our AI analyzes uploaded images and descriptions using advanced models to determine whether the issue is genuine.",
    },
    {
        id: "item-2",
        title: "What happens if I report a fake issue?",
        content:
            "The system automatically detects and filters out false or misleading reports to maintain platform integrity.",
    },
    {
        id: "item-3",
        title: "How are emergency issues handled?",
        content:
            "AI instantly detects emergency situations and prioritizes them for faster response by authorities.",
    },
    {
        id: "item-4",
        title: "Can I track the progress of my issue?",
        content:
            "Yes, you can track real-time updates and see how authorities are responding to your report.",
    },
    {
        id: "item-5",
        title: "What happens if multiple users report the same issue?",
        content:
            "When multiple users report the same issue, our system boosts its priority with additional points—ensuring faster attention from authorities.",
    },
    {
        id: "item-6",
        title: "Is my data secure?",
        content:
            "Yes, we prioritize user privacy and ensure all data is securely handled and protected.",
    },
    {
        id: "item-7",
        title: "What happens if an authority rejects an issue?",
        content:
            "If an issue is rejected, the authority is required to provide a valid reason. This ensures transparency and helps users understand the decision clearly.",
    },
];
