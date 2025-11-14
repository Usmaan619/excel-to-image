"use client"

import { createImageFromText } from "@/lib/image-processor"
import type { Image as ImageType } from "@/lib/types"

interface EditModalProps {
  image: ImageType
  text: string
  setText: (text: string) => void
  onSave: () => void
  onCancel: () => void
  images: ImageType[]
  setImages: (images: ImageType[]) => void
  setEditingId: (id: number | null) => void
}

export default function EditModal({ image, text, setText, onCancel, images, setImages, setEditingId }: EditModalProps) {
  const handleSave = async () => {
    try {
      const newImageDataUrl = await createImageFromText(text, image.rowNumber)
      setImages(images.map((i) => (i.id === image.id ? { ...i, dataUrl: newImageDataUrl, editedText: text } : i)))
      setEditingId(null)
    } catch (error) {
      console.error("Failed to save edit:", error)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-lg border border-border bg-muted/50 p-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 h-64 resize-none"
        placeholder="Edit the text..."
      />
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSave}
          className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-all hover:bg-muted"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
