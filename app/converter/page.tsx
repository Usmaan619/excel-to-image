"use client"

import { useState } from "react"
import FileUpload from "@/components/file-upload"
import ImageGallery from "@/components/image-gallery"
import ActionButtons from "@/components/action-buttons"
import UserNav from "@/components/user-nav"
import type { ProcessingState } from "@/lib/types"
import { useExcelProcessor } from "@/hooks/use-excel-processor"

export default function ConverterPage() {
  const [images, setImages] = useState<ProcessingState["images"]>([])
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")

  const { processFile } = useExcelProcessor()

  const handleFileUpload = async (file: File) => {
    setError("")
    setFileName(file.name)
    setLoading(true)

    try {
      const generatedImages = await processFile(file)
      setImages(generatedImages)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process file"
      setError(errorMessage)
      console.error("Processing error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setImages([])
    setFileName("")
    setError("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <UserNav />

      {/* Header Section */}
      <section className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Excel to Image</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Convert Excel spreadsheets into high-quality images in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} fileName={fileName} loading={loading} error={error} />

        {/* Action Buttons */}
        {images.length > 0 && <ActionButtons images={images} loading={loading} onClear={handleClear} />}

        {/* Gallery or Empty State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary"></div>
            <p className="mt-4 text-lg text-muted-foreground">Processing your file...</p>
          </div>
        ) : images.length > 0 ? (
          <ImageGallery images={images} setImages={setImages} />
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card/50 py-20 text-center">
            <div className="mx-auto h-12 w-12 text-muted-foreground opacity-50">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="mt-4 text-lg font-medium text-foreground">No images yet</p>
            <p className="mt-1 text-muted-foreground">Upload an Excel file to get started</p>
          </div>
        )}
      </section>
    </main>
  )
}
