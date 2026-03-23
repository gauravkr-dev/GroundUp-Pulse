"use client"

import { useState } from "react"
import AuthorityEmergencyIssue from "./authority-emergency-issue"
import AuthorityOpenIssue from "./authority-open-issue"
import AuthorityClosedIssue from "./authority-closed-issue"
import { AlertTriangle, CheckCircle, FolderOpen } from "lucide-react"

export default function AuthorityTabs() {

    const [tab, setTab] = useState("emergency")

    return (
        <div className="relative">

            {/* Fixed Tabs Bar */}
            <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-4xl px-4">
                <div className="flex justify-center">
                    <div className="flex gap-2 rounded-full dark:bg-[#161616] bg-white p-1 border">
                        <button
                            onClick={() => setTab("emergency")}
                            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
              ${tab === "emergency"
                                    ? "bg-red-500 text-white"
                                    : "text-muted-foreground hover:bg-red-500/10"
                                }`}
                        >
                            <AlertTriangle size={16} />
                            Emergency
                        </button>

                        <button
                            onClick={() => setTab("open")}
                            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
              ${tab === "open"
                                    ? "bg-blue-500 text-white"
                                    : "text-muted-foreground hover:bg-blue-500/10"
                                }`}
                        >
                            <FolderOpen size={16} />
                            Opened
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
                            Closed
                        </button>

                    </div>
                </div>
            </div>

            {/* Spacer so page content isn't hidden behind the fixed tabs */}
            <div className="h-20" />

            <div className="w-full space-y-6">

                {/* Content */}
                <div className="w-full">

                    {tab === "emergency" && (
                        <AuthorityEmergencyIssue />
                    )}

                    {tab === "open" && (
                        <AuthorityOpenIssue />
                    )}

                    {tab === "close" && (
                        <AuthorityClosedIssue />
                    )}

                </div>

            </div>

        </div>
    )
}