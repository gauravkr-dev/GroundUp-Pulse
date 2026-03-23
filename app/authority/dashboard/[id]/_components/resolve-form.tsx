/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldLabel } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import ImageUpload from './image-upload'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'

interface ResolveFormProps {
    onCancel: () => void;
    onSuccess?: () => void;
    resolvedBy?: string;
}
export const formSchema = z.object({
    comment: z.string().min(1, 'Comment is required'),
    images: z.array(z.string()).min(1, "Please upload at least one image.").max(4, "You can upload up to 4 images."),
})

type FormData = z.infer<typeof formSchema>
const ResolveForm = ({ onCancel, onSuccess, resolvedBy }: ResolveFormProps) => {
    const [loading, setLoading] = useState(false);
    const trpc = useTRPC();
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const updateIssueData = useMutation(
        trpc.issue.updateIssue.mutationOptions({
            onSuccess: () => {
                toast.success("Issue resolved successfully");
                router.push("/authority/dashboard");
                setLoading(false);
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error("Failed to resolve issue");
                setLoading(false);
            }
        })
    )
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
            images: [],
        }
    })

    const handleSubmit = (data: FormData) => {
        setLoading(true);
        updateIssueData.mutate({
            id: id,
            status: "resolved",
            resolveComment: data.comment,
            resolveImages: data.images,
            resolvedBy: resolvedBy
        })
        setLoading(false);

    }
    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
                <Field>
                    <FieldLabel htmlFor='comment'>Comment for Resolution</FieldLabel>
                    <Textarea id='comment' placeholder='Enter comment for resolution'
                        {...form.register('comment')} />
                    {form.formState.errors.comment && (
                        <p className='text-red-500 text-sm mt-1'>{form.formState.errors.comment.message}</p>
                    )}
                </Field>
                {/* Image upload */}
                <Field>
                    <FieldLabel className='mb-6'>Upload Images that Justify Resolution (Optional)</FieldLabel>

                    <ImageUpload
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

                <div className='flex justify-end'>
                    <Button
                        variant={"outline"}
                        className="mr-4 cursor-pointer"
                        type='button'
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button type='submit' className="bg-green-500 text-white hover:bg-green-600 cursor-pointer" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Resolution"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResolveForm
