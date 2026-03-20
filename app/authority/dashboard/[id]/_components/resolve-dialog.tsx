import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import ResolveForm from './resolve-form';

interface ResolveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    resolvedBy?: string;
}
const ResolveDialog = ({ open, onOpenChange, resolvedBy }: ResolveDialogProps) => {
    return (
        <div>
            <ResponsiveDialog title="Resolve Issue" description="Are you sure you want to resolve this issue?" open={open} onOpenChange={onOpenChange}>
                <ResolveForm resolvedBy={resolvedBy} onCancel={() => onOpenChange(false)} onSuccess={() => onOpenChange(false)} />
            </ResponsiveDialog>
        </div>
    )
}

export default ResolveDialog
