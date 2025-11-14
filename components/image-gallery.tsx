"use client"

import { useState } from "react"
import ImageCard from "./image-card"
import EditModal from "./edit-modal"
import type { Image as ImageType } from "@/lib/types"

interface ImageGalleryProps {
  images: ImageType[]
  setImages: (images: ImageType[]) => void
}

export default function ImageGallery({ images, setImages }: ImageGalleryProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const startEditing = (img: ImageType) => {
    setEditingId(img.id)
    const currentText = img.data
      .filter((val) => val !== null && val !== undefined && val !== "")
      .map((val) => String(val))
      .join("  ")
    setEditText(currentText)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Generated Images <span className="text-muted-foreground">({images.length})</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) =>
          editingId === img.id ? (
            <EditModal
              key={img.id}
              image={img}
              text={editText}
              setText={setEditText}
              onSave={() => {}}
              onCancel={cancelEdit}
              images={images}
              setImages={setImages}
              setEditingId={setEditingId}
            />
          ) : (
            <ImageCard key={img.id} image={img} onEdit={() => startEditing(img)} />
          ),
        )}
      </div>
    </>
  )
}
