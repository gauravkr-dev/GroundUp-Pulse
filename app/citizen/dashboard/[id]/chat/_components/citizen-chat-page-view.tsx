"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImagePlus, ImageUp, Send, X } from "lucide-react";
import Image from "next/image";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { UploadButton } from "@/utils/uploadthing";
import { Input } from "@/components/ui/input";
interface Message {
    id?: string;
    text?: string;
    imageUrl?: string;
    senderRole: "citizen" | "authority";
    createdAt?: string;
}

interface ChatProps {
    issueId: string;
}

export default function Chat({ issueId }: ChatProps) {
    const trpc = useTRPC();

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    const sendMessageMutation = useMutation(
        trpc.message.sendMessage.mutationOptions({
            onError: (error) => {
                toast.error("Failed to send message: " + error.message);
            },
        })
    );
    const { data: initialMessages, isLoading } = useSuspenseQuery(
        trpc.message.getMessages.queryOptions({ issueId })
    )

    useEffect(() => {
        if (initialMessages) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMessages(
                initialMessages.map((msg) => ({
                    ...msg,
                    senderRole: msg.role,
                    text: msg.text ?? undefined,
                    imageUrl: msg.imageUrl ?? undefined,
                }))
            );
        }
    }, [initialMessages]);

    useEffect(() => {
        socket.emit("join-room", issueId);
        const handleMessage = (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("receive-message", handleMessage);

        return () => {
            socket.off("receive-message", handleMessage);
        };

    }, [issueId]);

    const sendMessage = async () => {

        try {
            const message = {
                issueId,
                text: text.trim() || undefined,
                imageUrl: image ?? undefined,
            };

            await sendMessageMutation.mutateAsync(message);

            socket.emit("send-message", {
                roomId: issueId,
                text: text.trim() || undefined,
                senderRole: "citizen",
                imageUrl: image,
            });

            setText("");
            setImage(null);
        } catch (err) {
            console.error("Error sending message:", err);
        }

    };

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages]);

    return (
        <>
            <ResponsiveDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} title={"Upload Image"} description={"Upload an image to share in the chat."} >
                <div className="p-4 flex flex-col items-center justify-center rounded-md gap-8 border border-dashed">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-dashed mt-4">
                        <ImageUp />
                    </div>
                    {uploading ? (
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">Uploading...</span>
                        </div>
                    ) : (
                        <UploadButton
                            endpoint={"imageUploader"}
                            onUploadBegin={() => setUploading(true)}
                            onClientUploadComplete={(res) => {
                                const url = res?.[0]?.ufsUrl
                                setImage(url)
                                setIsDialogOpen(false)
                                setUploading(false)
                            }}
                            onUploadError={(error: Error) => {
                                setUploading(false)
                                toast.error("Upload failed: " + error.message)
                            }}
                            content={{ allowedContent: () => <></>, button: "Upload Image" }}
                        />
                    )}
                </div>
            </ResponsiveDialog>
            <div className="px-4 md:px-12">
                <div className="flex flex-col h-[80vh] border rounded-xl">
                    {/* Header */}
                    <div className="border-b px-4 py-3 gap-4 flex md:flex-row flex-col justify-between">
                        <p className="font-medium text-sm text-muted-foreground truncate">
                            Chat with Authority
                        </p>
                        <span className="text-xs text-muted-foreground truncate text-right">
                            Issue ID: {issueId}
                        </span>
                    </div>

                    {/* Messages */}
                    {isLoading && (
                        <div className="flex items-center justify-center p-4">
                            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm ml-2">Loading messages...</span>
                        </div>
                    )}
                    <div
                        ref={containerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
                    >
                        {messages.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center mt-4">
                                No messages yet — start the conversation.
                            </p>
                        ) : (
                            messages.map((m, i) => {
                                const isCitizen = m.senderRole === "citizen";

                                return (
                                    <div
                                        key={m.id || i}
                                        className={`flex flex-col ${isCitizen ? "items-end" : "items-start"}`}
                                    >
                                        <div className="max-w-[70%]">
                                            {m.imageUrl && (
                                                <Image
                                                    src={m.imageUrl}
                                                    alt="message image"
                                                    width={400}
                                                    height={100}
                                                    className="rounded-md object-cover mt-2 border"
                                                />
                                            )}

                                            {m.text && (
                                                <div
                                                    className={`rounded-lg px-4 py-2 text-sm my-2 ${isCitizen ? "border-[#1F63B9] border bg-[#1F63B9] text-white" : "border bg-gray-100 text-gray-800 dark:bg-[#121212] dark:text-white"}`}
                                                >
                                                    <p>{m.text}</p>
                                                </div>
                                            )}

                                            {m.createdAt && (
                                                <p className={`text-[10px] opacity-70 mt-1 text-right`}>
                                                    {new Date(m.createdAt).toLocaleTimeString("en-IN", {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* // Input Area */}
                    <div className="w-full max-w-4xl mx-auto mb-1 ">
                        <div className=" flex px-2 py-2 flex-col gap-4 items-center">

                            {/* Image Upload */}

                            {/* Text Area */}
                            <Input
                                placeholder="Reply to the authority..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="resize-none outline-none bg-transparent text-sm rounded-md placeholder:text-gray-400 py-4 px-4"
                            />
                            <div className="flex justify-between items-center w-full">

                                <Button
                                    variant={"outline"}
                                    className={`relative group flex items-center justify-center ${image ? "h-8.5 w-20" : "w-8.5 h-8.5"} rounded-md border cursor-pointer overflow-hidden p-0`}
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    {image ? (
                                        <div className="w-full h-full">
                                            <Image
                                                src={image}
                                                alt="uploaded image"
                                                width={120}
                                                height={120}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            <Button
                                                size={"icon"}
                                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded cursor-pointer p-2 px-3 group-hover:opacity-100 opacity-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setImage(null);
                                                }}
                                            >
                                                <X size={8} />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            <ImagePlus size={12} />
                                        </div>

                                    )}
                                </Button>

                                {/* Send Button */}
                                <Button className="flex items-center justify-center max-w-max rounded-md bg-[#1F63B9] cursor-pointer hover:bg-[#1F63B9]/90"
                                    onClick={sendMessage}
                                    disabled={!text.trim() && !image}
                                >
                                    Send
                                    <Send size={12} />
                                </Button>
                            </div>

                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
