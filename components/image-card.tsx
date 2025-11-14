"use client"

import { Download, Edit2 } from "lucide-react"
import type { Image as ImageType } from "@/lib/types"

interface ImageCardProps {
  image: ImageType
  onEdit: () => void
}

export default function ImageCard({ image, onEdit }: ImageCardProps) {
  const downloadImage = () => {
    const link = document.createElement("a")
    link.download = `excel-row-${image.rowNumber}.png`
    link.href = image.dataUrl
    link.click()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/30">
      <div className="aspect-video overflow-auto bg-muted/50 p-2">
        <img
          src={image.dataUrl || "/placeholder.svg"}
          alt={`Row ${image.rowNumber}`}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground">Row {image.rowNumber}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{image.cellCount} cells</p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <Edit2 className="inline h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={downloadImage}
            className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Download className="inline h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
