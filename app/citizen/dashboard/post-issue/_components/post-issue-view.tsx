/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import IssueLocationMap from "./IssueLocationMap"
import { ArrowLeft } from "lucide-react"
import { BadgeCheck, OctagonAlert, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import IssueImageUpload from "./IssueImageUpload"
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export const categories = [
    "water",
    "road",
    "electricity",
    "sanitation",
    "traffic",
    "other",
] as const;
const postIssueFormSchema = z.object({
    describe_issue: z
        .string()
        .nonempty("Description is required.")
        .min(10, "Please provide a detailed description of the issue."),
    images: z.array(z.string()).min(1, "Please upload at least one image.").max(4, "You can upload up to 4 images."),
    latitude: z.number().refine((v) => v !== 0 && !Number.isNaN(v), { message: "Please mark the exact location on the map." }),

    longitude: z.number().refine((v) => v !== 0 && !Number.isNaN(v), { message: "Please mark the exact location on the map." }),

    address: z.string().nonempty("Address is required.").min(5, "Please provide a valid address or landmark."),

    category: z.enum(categories, { message: "Please select a relavent issue category." }),
})

type FormData = z.infer<typeof postIssueFormSchema>

type IssueStatusModalProps = {
    type: "success" | "error" | "duplicate";
    message: string;
    onClose: () => void;
    onAction: () => void;
};

const IssueStatusModal = ({ type, message, onAction }: IssueStatusModalProps) => {
    const icon =
        type === "success" ? (
            <BadgeCheck className="text-green-500" size={40} />
        ) : type === "duplicate" ? (
            <OctagonAlert className="text-yellow-500" size={40} />
        ) : (
            <XCircle className="text-red-500" size={40} />
        );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-xl bg-card border p-6 shadow-lg">
                <div className="flex flex-col items-center text-center">
                    {icon}
                    <h3 className="text-lg font-semibold mt-3 mb-2">
                        {type === "success" ? "Issue Posted" : type === "duplicate" ? "Duplicate Issue Found" : "Submission Failed"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">{message}</p>
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant={"outline"} onClick={onAction} className={` rounded cursor-pointer ${type === "success" ? "border-green-500 text-green-500 hover:bg-green-500/10 dark:hover:bg-green-500/10" : type === "duplicate" ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 dark:hover:bg-yellow-500/10" : "border-red-500 text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/10"} text-white`}>
                        {type === "success" ? "Go to Dashboard" : type === "duplicate" ? "Go to Dashboard" : "Okay"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const PostIssueView = () => {
    const [location, setLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState<{
        type: "success" | "error" | "duplicate";
        message: string;
        issueId?: string;
    } | null>(null);
    const trpc = useTRPC();
    const router = useRouter();
    const createPostIssue = useMutation(
        trpc.postIssue.checkAndCreateIssue.mutationOptions({
            onSuccess: (data) => {
                if (data.type === "duplicate" && "issueId" in data) {
                    setModal({
                        type: "duplicate",
                        message: data.message,
                        issueId: data.issueId,
                    });
                    return;
                }
                setIsSubmitting(false);
                setModal({
                    type: "success",
                    message: "Your issue has been posted successfully!",
                });
            },

            onError: (error) => {
                setModal({
                    type: "error",
                    message: error.message || "Something went wrong",
                });
                setIsSubmitting(false);
            },
        })
    )

    const form = useForm<FormData>({
        resolver: zodResolver(postIssueFormSchema),
        defaultValues: {
            describe_issue: "",
            images: [],
            latitude: 0,
            longitude: 0,
            address: "",
            category: undefined,
        },
    })

    // sync map location with form
    useEffect(() => {
        if (location) {
            form.setValue("latitude", location.lat)
            form.setValue("longitude", location.lng)
        }
    }, [location, form])

    const onSubmit = async (data: FormData) => {
        createPostIssue.mutate({
            describe_issue: data.describe_issue,
            images: data.images,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            category: data.category,
        }
        )
        setIsSubmitting(true)
    }

    return (
        <>
            <Button
                onClick={() => router.back()}
                className="group max-w-max text-sm py-2 px-3 rounded hover:cursor-pointer my-6 px-4 md:px-12"
                variant={"link"}
            >
                <ArrowLeft className='group-hover:-translate-x-1 transition-transform dark:text-foreground' />
                <span className='dark:text-foreground underline'>Back</span>

            </Button>
            <div className="max-w-3xl mx-auto px-4 mb-6">

                {/* Header */}
                <div className="text-center mb-8 mt-4">
                    <h2 className="text-2xl font-semibold w-full py-3 px-4 bg-blue-50 dark:bg-blue-900/10 text-center text-blue-500 rounded-md">Raise a Civic Concern</h2>
                    <p className="text-sm mt-4">
                        Describe the issue clearly. Include what happened, where it is, and how serious it is and mark the exact location on the map.
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-card border rounded-xl p-6 shadow-sm"
                >
                    {/* Image upload */}
                    <Field>
                        <FieldLabel>Upload Issue Images</FieldLabel>

                        <IssueImageUpload
                            onChange={(urls) => {
                                form.setValue("images", urls)
                            }}
                        />
                        {form.formState.errors.images && (
                            <p className="text-sm text-red-500">
                                {(form.formState.errors.images as any).message}
                            </p>
                        )}
                    </Field>
                    {/* Description */}
                    <Field>
                        <FieldLabel>Describe the Issue</FieldLabel>
                        <Textarea
                            placeholder="Example: Water leakage near the main road causing traffic issues..."
                            {...form.register("describe_issue")}
                        />
                        {form.formState.errors.describe_issue && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.describe_issue.message}
                            </p>
                        )}
                    </Field>

                    {/* Category */}
                    <Field>
                        <FieldLabel>Issue Category</FieldLabel>

                        <Controller
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select related issue category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Issue Categories</SelectLabel>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {form.formState.errors.category && (
                            <p className="text-sm text-red-500">
                                {(form.formState.errors.category as any).message}
                            </p>
                        )}
                    </Field>

                    {/* Address */}
                    <Field>
                        <FieldLabel>Address / Landmark</FieldLabel>

                        <Input
                            type="text"
                            placeholder="Example: Near Gandhi Chowk"
                            {...form.register("address")}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />

                        {form.formState.errors.address && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.address.message}
                            </p>
                        )}
                    </Field>

                    {/* Map */}
                    <Field>
                        <FieldLabel>Select Issue Location</FieldLabel>

                        <p className="text-sm text-muted-foreground mb-2">
                            Search, zoom, or click on the map to mark the exact location.
                        </p>

                        <IssueLocationMap
                            onLocationSelect={(lat, lng) => {
                                setLocation({ lat, lng })
                            }}
                        />
                        {(form.formState.errors.latitude || form.formState.errors.longitude) && (
                            <p className="text-sm text-red-500">
                                {((form.formState.errors.latitude as any)?.message) || ((form.formState.errors.longitude as any)?.message)}
                            </p>
                        )}
                    </Field>

                    {/* Hidden fields */}
                    <Input type="hidden" {...form.register("latitude", { valueAsNumber: true })} />
                    <Input type="hidden" {...form.register("longitude", { valueAsNumber: true })} />

                    {/* Submit */}
                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            className="group max-w-max bg-primary text-primary-foreground text-sm py-2 px-3 rounded hover:cursor-pointer hover:bg-primary/90"
                            disabled={isSubmitting}
                        >
                            <span className='dark:text-foreground'>{isSubmitting ? <span className="flex items-center flex-row justify-center gap-1"><Spinner /> Submitting...</span> : "Submit Issue"}</span>
                        </Button>
                    </div>

                </form>

                {modal && (
                    <IssueStatusModal
                        type={modal.type}
                        message={modal.message}
                        onClose={() => setModal(null)}
                        onAction={() => {
                            if (modal.type === "duplicate" || modal.type === "success") {
                                router.push("/citizen/dashboard");
                            } else {
                                setModal(null);
                            }
                        }}
                    />
                )}
            </div>
        </>
    )
}

export default PostIssueView
