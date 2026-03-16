"use client"

import { useState } from "react"
import { CheckCircle, FolderOpen } from "lucide-react"
import CitizenOpenIssue from "./citizen-open-issue"
import CitizenClosedIssue from "./citizen-closed-issue"

export default function CitizenTabs() {

    const [tab, setTab] = useState("open")

    return (
        <div>

            <div className="w-full space-y-6">

                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="flex gap-6 rounded-full dark:bg-[#161616] p-1 border border">

                        <button
                            onClick={() => setTab("open")}
                            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
              ${tab === "open"
                                    ? "bg-blue-500 text-white"
                                    : "text-muted-foreground hover:bg-blue-500/10"
                                }`}
                        >
                            <FolderOpen size={16} />
                            Open Issues
                        </button>

                        <button
                            onClick={() => setTab("close")}
                            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
              ${tab === "close"
                                    ? "bg-green-500 text-white shadow"
                                    : "text-muted-foreground hover:bg-green-500/10"
                                }`}
                        >
                            <CheckCircle size={16} />
                            Closed Issues
                        </button>

                    </div>
                </div>

                {/* Content */}

                <div className="w-full">

                    {tab === "open" && (
                        <CitizenOpenIssue />
                    )}

                    {tab === "close" && (
                        <CitizenClosedIssue />
                    )}

                </div>

            </div>

        </div>
    )
}