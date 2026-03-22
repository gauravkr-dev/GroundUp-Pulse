"use client";

import { format } from "date-fns";
import { ShieldBan } from "lucide-react";
import Image from "next/image";

type RejectedCardProps = {
    reason: string;
    images?: string[];
    rejectedBy: string;
    rejectedAt: Date;
};

export default function RejectedCard({
    reason,
    images = [],
    rejectedBy,
    rejectedAt,
}: RejectedCardProps) {
    return (
        <div className="w-full mt-12">
            <div className="rounded-2xl border p-5 space-y-5">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <ShieldBan className="text-red-500 size-5" />
                    <h2 className="text-lg font-medium text-red-600 font-serif underline">
                        Issue Rejected
                    </h2>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border">
                    {/* Reason */}
                    <div className="mb-4">
                        <p className="font-medium mb-2 font-serif underline">
                            Rejection Reason:
                        </p>
                        <p className="text-sm ml-4">
                            {reason}
                        </p>
                    </div>

                    {/* Images */}
                    {images.length > 0 && (
                        <div className="mb-4">
                            <p className="font-medium font-serif mb-4 underline">
                                Attached Images:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {images.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        alt="rejection"
                                        width={300}
                                        height={200}
                                        className="w-full h-full object-cover rounded-lg border hover:scale-105 transition cursor-pointer"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row md:justify-between pt-3 border-t gap-4">
                        <p>
                            <span className="font-serif underline">Rejected by:</span> <span className="font-medium text-gray-700 text-sm">{rejectedBy}</span>
                        </p>
                        <p className="text-sm text-right">{format(new Date(rejectedAt), "PPP p")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}