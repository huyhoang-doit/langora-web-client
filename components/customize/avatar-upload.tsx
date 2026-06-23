import React, { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, Loader2 } from "lucide-react"

interface AvatarUploadProps {
  url?: string
  fallback?: string
  onUpload: (file: File) => Promise<void>
  disabled?: boolean
  className?: string
}

export default function AvatarUpload({ url, fallback, onUpload, disabled, className = "size-24" }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Kiểm tra định dạng
    if (!file.type.startsWith("image/")) {
      return // Có thể toast lỗi tại nơi gọi component
    }

    try {
      setIsUploading(true)
      await onUpload(file)
    } finally {
      setIsUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className={`relative group inline-block rounded-full ${className}`}>
      <Avatar className="w-full h-full border-2 border-border/50 shadow-sm">
        <AvatarImage src={url} className="object-cover" />
        <AvatarFallback className="text-2xl bg-muted font-semibold text-muted-foreground">
          {fallback?.charAt(0)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      
      {!disabled && (
        <>
          <div 
            className={`absolute inset-0 bg-black/50 rounded-full transition-opacity flex items-center justify-center cursor-pointer ${isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} 
            onClick={() => !isUploading && inputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="size-6 text-white animate-spin" />
            ) : (
              <Camera className="size-6 text-white" />
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </>
      )}
    </div>
  )
}
