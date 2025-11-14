export interface Image {
  id: number
  dataUrl: string
  rowNumber: number
  data: (string | number | null | undefined)[]
  cellCount: number
  editedText?: string
}

export interface ProcessingState {
  images: Image[]
  loading: boolean
  fileName: string
  error: string
}
