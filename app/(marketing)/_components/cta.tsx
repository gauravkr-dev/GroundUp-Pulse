import { Button } from "@/components/ui/button";
import { DecorIcon } from "@/components/ui/decor-icon";
import Link from "next/link";

export function CallToAction() {
    return (
        <section className="my-18 px-4" id="call-to-action">
            <div className="relative flex flex-col max-w-6xl mx-auto items-center justify-between gap-y-4 border-y py-4">
                <DecorIcon className="size-4" position="top-left" />
                <DecorIcon className="size-4" position="top-right" />
                <DecorIcon className="size-4" position="bottom-left" />
                <DecorIcon className="size-4" position="bottom-right" />

                <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l" />
                <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r" />

                <div className="hidden md:block absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />
                <div className="block md:hidden absolute left-0 top-1/2 -translate-y-1/2 -z-10 w-full border-t border-dashed transform" />

                <div>
                    <div className="w-full grid md:grid-cols-2 gap-6">

                        {/* Citizen */}
                        <div className=" p-6 text-left">
                            <h3 className="text-lg font-semibold mb-2">
                                Raise Your Voice
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Report issues around you and track their progress in real-time.
                            </p>
                            <Link href="/citizen/sign-up">
                                <Button className="bg-primary text-white rounded mt-4 cursor-pointer">
                                    Report an Issue
                                </Button>
                            </Link>
                        </div>

                        {/* Authority */}
                        <div className="p-6 text-left">
                            <h3 className="text-lg font-semibold mb-2">
                                Take Action Faster
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Manage public issues efficiently and respond to citizens with transparency.
                            </p>
                            <Link href="/authority/sign-up">
                                <Button className="rounded bg-primary text-white mt-4 cursor-pointer">
                                    Manage Issues
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
