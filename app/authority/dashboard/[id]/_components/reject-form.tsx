/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldLabel } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import ImageUpload from './image-upload'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'

interface RejectFormProps {
    onCancel: () => void;
    onSuccess?: () => void;
    rejectedBy?: string;
}
export const formSchema = z.object({
    reason: z.string().min(1, 'Reason is required'),
    images: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof formSchema>
const RejectForm = ({ onCancel, onSuccess, rejectedBy }: RejectFormProps) => {
    const trpc = useTRPC();
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const updateIssueData = useMutation(
        trpc.issue.updateIssue.mutationOptions({
            onSuccess: () => {
                toast.success("Issue rejected successfully");
                router.push("/authority/dashboard");
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: () => {
                toast.error("Failed to reject issue");
            }
        })
    )
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: '',
            images: [],
        }
    })

    const handleSubmit = (data: FormData) => {
        updateIssueData.mutate({
            id: id,
            status: "rejected",
            rejectReason: data.reason,
            rejectImages: data.images,
            rejectedBy: rejectedBy
        })
    }
    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
                <Field>
                    <FieldLabel htmlFor='reason'>Reason for Rejection</FieldLabel>
                    <Textarea id='reason' placeholder='Enter reason for rejection'
                        {...form.register('reason')} />
                    {form.formState.errors.reason && (
                        <p className='text-red-500 text-sm mt-1'>{form.formState.errors.reason.message}</p>
                    )}
                </Field>
                {/* Image upload */}
                <Field>
                    <FieldLabel className='mb-4'>Upload Images that Justify Rejection (Optional)</FieldLabel>

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
                    <Button type='submit' className="bg-red-500 text-white hover:bg-red-600 cursor-pointer">
                        Submit Rejection
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default RejectForm
