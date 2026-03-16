// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { UploadButton } from '@/utils/uploadthing'
// import React, { useState } from 'react'
// import { toast } from 'sonner'

// interface ChatImageUploadProps {
//     onUploadComplete: (url: string) => void
//     open ?: (open: boolean) => void
// }

// const ChatImageUpload = ({ onUploadComplete, open }: ChatImageUploadProps) => {
//     const [image, setImage] = useState<string | null>(null)

//     const handleUpload = (res: any) => {
//         const url = res?.[0]?.ufsUrl
//         setImage(url)
//         onUploadComplete(url)
//         open && open(false)
//     }
//     return (
//         <div>
//             {/* //Upload Button */}

//             {!image && (
//                 <div className="">
//                     <UploadButton
//                         endpoint={"imageUploader"}
//                         onClientUploadComplete={(res) => {
//                             handleUpload(res)
//                         }}
//                         onUploadError={(error: Error) => {
//                             toast.error("Upload failed: " + error.message)
//                         }}
//                         appearance={{
//                             // make the upload button cover the parent and invisible
//                             button: "flex items-center justify-center w-10 h-10 rounded-full border cursor-pointer",
//                         }}
//                     />
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ChatImageUpload
