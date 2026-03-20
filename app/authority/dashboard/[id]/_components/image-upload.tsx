/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react"
import Image from "next/image"
import { UploadButton } from "@/utils/uploadthing"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Props {
    onChange: (urls: string[]) => void
}

export default function ImageUpload({ onChange }: Props) {

    const [images, setImages] = useState<string[]>([])

    const handleUpload = (res: any) => {

        const urls = res.map((file: any) => file.url)

        const updated = [...images, ...urls].slice(0, 4)

        setImages(updated)

        onChange(updated)
    }

    const removeImage = (index: number) => {

        const updated = images.filter((_, i) => i !== index)

        setImages(updated)

        onChange(updated)
    }

    return (
        <div className="space-y-3">

            {/* preview grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    {images.map((img, i) => (
                        <div key={i} className="relative group">

                            <Image
                                src={img}
                                alt="issue image"
                                width={200}
                                height={200}
                                className="rounded-lg object-cover w-full h-28 border"
                            />

                            <Button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="absolute top-1 right-1 bg-black/70 text-white rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
                            >
                                <X />
                            </Button>

                        </div>
                    ))}

                </div>
            )}

            {/* upload button */}
            {images.length < 4 && (
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {

                        handleUpload(res)

                    }}
                    onUploadError={(error: Error) => {
                        toast.error("Upload failed: " + error.message)
                    }}
                    appearance={{
                        button:
                            "ut-ready:bg-primary ut-uploading:bg-primary/70 ut-button:w-full ut-button:h-10 ut-button:text-sm ut-button:rounded-md",
                    }}
                />
            )}

            <p className="text-xs text-muted-foreground">
                Upload up to 4 images (Max 4MB each)
            </p>

        </div>
    )
}
