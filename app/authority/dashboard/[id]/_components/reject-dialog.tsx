import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import RejectForm from './reject-form';

interface RejectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rejectedBy?: string;
}
const RejectDialog = ({ open, onOpenChange, rejectedBy }: RejectDialogProps) => {
    return (
        <div>
            <ResponsiveDialog title="Reject Issue" description="Are you sure you want to reject this issue?" open={open} onOpenChange={onOpenChange}>
                <RejectForm
                    onCancel={() => onOpenChange(false)}
                    onSuccess={() => onOpenChange(false)}
                    rejectedBy={rejectedBy}
                />
            </ResponsiveDialog>
        </div>
    )
}

export default RejectDialog
