import { Button } from '@/components/Button'
import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'


interface IImageUpload {
  selectedFile?: string
  setSelectedFile: (value: string) => void
  onSelectImage: (e: ChangeEvent<HTMLInputElement>) => void
  setSelectedTab: (value: string) => void
}

export const ImageUpload = ({ onSelectImage, setSelectedFile, setSelectedTab, selectedFile }: IImageUpload) => {

  const selectedFileRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    document.getElementById('file-input')?.click()
  }

  console.log(selectedFile)
  return (
    <div className='flex items-center justify-center flex-col w-full'>
      {selectedFile ? (
        <>
          <Image src={selectedFile} width={400} height={400} alt='' />
          <div className="flex mt-4 gap-2">
            <Button className='h-7' onClick={() => setSelectedTab('Post')}>Back to Post</Button>
            <Button variant='outline' className='h-7' onClick={() => setSelectedFile('')}>Remove</Button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-20 border border-dashed border-gray-200 w-full rounded">
          <Button type='button' variant='outline' className='h-7' onClick={handleUploadClick}>Upload</Button>
          <input type="file" id="file-input" hidden ref={selectedFileRef} onChange={onSelectImage} />
        </div>
      )}
    </div>
  )
}
