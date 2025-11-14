"use client"

import { Download, Trash2, Archive } from "lucide-react"
import { useState } from "react"
import type { Image as ImageType } from "@/lib/types"

interface ActionButtonsProps {
  images: ImageType[]
  loading: boolean
  onClear: () => void
}

export default function ActionButtons({ images, loading, onClear }: ActionButtonsProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAllImages = () => {
    images.forEach((img, index) => {
      setTimeout(() => {
        const link = document.createElement("a")
        link.download = `excel-row-${img.rowNumber}.png`
        link.href = img.dataUrl
        link.click()
      }, index * 300)
    })
  }

  const downloadAsZip = async () => {
    setIsDownloading(true)
    try {
      // Import JSZip from CDN
      if (!window.JSZip) {
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
        document.head.appendChild(script)

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve()
          script.onerror = () => reject(new Error("Failed to load JSZip"))
        })
      }

      const zip = new (window as any).JSZip()

      // Add each image to zip
      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        const base64Data = img.dataUrl.split(",")[1]
        zip.file(`row-${img.rowNumber}.png`, base64Data, { base64: true })
      }

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: "blob" })

      // Download zip
      const link = document.createElement("a")
      link.href = URL.createObjectURL(zipBlob)
      link.download = `excel-images-${Date.now()}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error creating zip:", error)
      alert("Failed to create zip file. Try downloading images individually.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
      <button
        onClick={downloadAllImages}
        disabled={loading || isDownloading}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
      >
        <Download className="h-5 w-5" />
        Download All ({images.length})
      </button>
      <button
        onClick={downloadAsZip}
        disabled={loading || isDownloading}
        className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/90 disabled:opacity-50"
      >
        <Archive className="h-5 w-5" />
        {isDownloading ? "Creating ZIP..." : "Download as ZIP"}
      </button>
      <button
        onClick={onClear}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:bg-muted disabled:opacity-50"
      >
        <Trash2 className="h-5 w-5" />
        Clear
      </button>
    </div>
  )
}
