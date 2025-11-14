"use client"

import * as XLSX from "xlsx"
import type { Image } from "@/lib/types"
import { createImageFromText } from "@/lib/image-processor"

export function useExcelProcessor() {
  const processFile = async (file: File): Promise<Image[]> => {
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)

      if (!workbook.SheetNames.length) {
        throw new Error("No sheets found in the workbook")
      }

      const worksheet = workbook.Sheets[workbook.SheetNames[0]]

      if (!worksheet["!ref"]) {
        throw new Error("Worksheet is empty")
      }

      const range = XLSX.utils.decode_range(worksheet["!ref"])
      const jsonData: (string | number | null | undefined)[][] = []

      // Read each row as array including empty cells
      for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        const row: (string | number | null | undefined)[] = []
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum })
          const cell = worksheet[cellAddress]
          row.push(cell ? cell.v : "")
        }
        jsonData.push(row)
      }

      if (jsonData.length <= 1) {
        throw new Error("Spreadsheet should have at least one data row")
      }

      const generatedImages: Image[] = []
      const startRow = 1

      for (let i = startRow; i < jsonData.length; i++) {
        const rowData = jsonData[i]
        const imageDataUrl = await createImageFromText(
          rowData
            .filter((val) => val !== null && val !== undefined && val !== "")
            .map((val) => String(val))
            .join("  "),
          i,
        )

        generatedImages.push({
          id: Date.now() + i,
          dataUrl: imageDataUrl,
          rowNumber: i,
          data: rowData,
          cellCount: rowData.length,
        })
      }

      return generatedImages
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to process Excel file. Please ensure it is a valid .xlsx or .xls file.",
      )
    }
  }

  return { processFile }
}
