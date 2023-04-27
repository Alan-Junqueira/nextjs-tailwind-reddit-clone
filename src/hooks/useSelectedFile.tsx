import { ChangeEvent, useState } from 'react'

export const useSelectedFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>('');

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()

    const firstFile = e.target.files?.[0]

    if (firstFile) {
      fileReader.readAsDataURL(firstFile)
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string)
      }
    }
  }

  const changeSelectedFile = (file: string) => {
    setSelectedFile(file)
  }

  return {
    selectedFile, changeSelectedFile, handleSelectFile
  }
}
