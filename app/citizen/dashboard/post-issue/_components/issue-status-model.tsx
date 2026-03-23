import * as React from "react";
import { XCircle, X, BadgeCheck, OctagonAlert } from "lucide-react";
type StatusType = "success" | "error" | "duplicate";

interface IssueStatusModalProps {
    type: StatusType;
    message: string;
    onClose: () => void;
    onAction?: () => void;
}

export const IssueStatusModal = ({
    type,
    message,
    onClose,
    onAction,
}: IssueStatusModalProps) => {

    const config = {
        success: {
            icon: (
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500">
                    <BadgeCheck className="text-white" size={20} />
                </div>
            ),
            title: "Issue Posted!",
            buttonText: "Go to Home",
            action: onAction,
            color: "bg-green-500 hover:bg-green-600",
        },
        duplicate: {
            icon: (
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500">
                    <OctagonAlert className="text-white" size={20} />
                </div>
            ),
            title: "Issue Already Exists",
            buttonText: "Go to Home",
            action: onAction,
            color: "bg-yellow-500 hover:bg-yellow-600",
        },
        error: {
            icon: (
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500">
                    <XCircle className="text-white" size={20} />
                </div>
            ),
            title: "Something went wrong",
            buttonText: "Close",
            action: onClose,
            color: "bg-red-500 hover:bg-red-600",
        },
    };

    const current = config[type];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-xl p-6">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-black"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    {current.icon}

                    <h2 className="text-xl font-semibold mt-3 mb-2">
                        {current.title}
                    </h2>

                    <p className="text-gray-600 text-sm">{message}</p>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={current.action}
                        className={`px-4 py-2 text-white rounded-md ${current.color}`}
                    >
                        {current.buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};