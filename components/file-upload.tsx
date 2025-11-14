"use client"

import type React from "react"

import { useRef } from "react"
import { Upload } from "lucide-react"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  fileName: string
  loading: boolean
  error: string
}

export default function FileUpload({ onFileUpload, fileName, loading, error }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary", "bg-primary/5")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
    const file = e.dataTransfer.files?.[0]
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      onFileUpload(file)
    }
  }

  return (
    <div className="mb-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="group rounded-xl border-2 border-dashed border-border bg-card/50 p-12 transition-all hover:border-primary hover:bg-primary/5"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="flex w-full flex-col items-center gap-3 cursor-pointer disabled:cursor-not-allowed"
        >
          <Upload className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">Upload Excel File</p>
            <p className="mt-1 text-sm text-muted-foreground">Drag and drop or click to select (.xlsx, .xls, .csv)</p>
          </div>
        </button>
      </div>

      {fileName && !error && (
        <div className="mt-3 rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary">
          Selected: <span className="font-semibold">{fileName}</span>
        </div>
      )}

      {error && (
        <div className="mt-3 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}
