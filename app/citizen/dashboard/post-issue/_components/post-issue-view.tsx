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
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import IssueImageUpload from "./IssueImageUpload"
import { useMutation } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios from "axios"

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

const PostIssueView = () => {
    const [location, setLocation] = useState<{
        lat: number
        lng: number
    } | null>(null)

    const [isSubmitting, setIsSubmitting] = useState(false);

    const trpc = useTRPC();
    const router = useRouter();
    const createPostIssue = useMutation(
        trpc.postIssue.create.mutationOptions({
            onSuccess: () => {
                toast.success("Issue reported successfully!")
                router.push("/citizen/dashboard")
            },
            onError: (error) => {
                toast.error("Failed to report the issue. Please try again.")
                console.error("Error reporting issue:", error)
            }
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
        setIsSubmitting(true)
        const result = await axios.post("/api/post-issue-analysis", {
            describe_issue: data.describe_issue,
            images: data.images,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            category: data.category
        })

        const title = result.data.response.title;
        const priority_score = result.data.response.priority_score;
        const department = result.data.department;
        console.log("Analysis result:", department, title, priority_score);
        createPostIssue.mutate({
            title: title,
            department: department,
            priority_score: String(priority_score),
            describe_issue: data.describe_issue,
            images: data.images,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            category: data.category
        })
    }

    return (
        <>
            <Link href="/citizen/dashboard" className="my-6 px-4 md:px-12">
                <Button
                    className="group max-w-max bg-primary text-primary-foreground text-sm py-2 px-3 rounded hover:cursor-pointer hover:bg-primary/90"
                    disabled={isSubmitting}
                >
                    <ArrowLeft className='group-hover:-translate-x-1 transition-transform dark:text-foreground' />
                    <span className='dark:text-foreground'>Back</span>

                </Button>
            </Link>
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
                            className="group max-w-max bg-primary text-primary-foreground text-sm py-2 px-3 rounded hover:cursor-pointer hover:bg-primary/90"
                            disabled={isSubmitting}
                        >
                            <span className='dark:text-foreground'>{isSubmitting ? "Submitting..." : "Submit Issue"}</span>
                        </Button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default PostIssueView
