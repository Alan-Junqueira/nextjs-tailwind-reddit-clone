'use client'

import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BiPoll } from 'react-icons/bi'
import { TabItem as TabItemType } from "@/@types/TabItem"
import { TabItem } from './TabItem'
import { ChangeEvent, useState } from 'react'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { TextInputs } from './postform/TextInputs'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUpload } from './postform/ImageUpload'

const formTabs: TabItemType[] = [
  {
    title: 'Post',
    icon: IoDocumentText
  },
  {
    title: 'Images & Video',
    icon: IoImageOutline
  },
  {
    title: 'Link',
    icon: BsLink45Deg
  },
  {
    title: 'Pool',
    icon: BiPoll
  },
  {
    title: 'Talk',
    icon: BsMic
  },
]

const newPostFormSchema = z.object({
  title: z.string(),
  textBody: z.string(),
})

export type NewPostFormInputs = z.infer<typeof newPostFormSchema>

export const NewPostForm = () => {
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
  const [selectedFile, setSelectedFile] = useState('');

  const newPostForm = useForm<NewPostFormInputs>({
    resolver: zodResolver(newPostFormSchema)
  })
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = newPostForm

  const changeSelectedTab = (selectedTab: string) => {
    setSelectedTab(selectedTab);
  }

  const changeSelectedFile = (selectedFile: string) => {
    setSelectedFile(selectedFile);
  }

  const handleCreatePost = async (data: NewPostFormInputs) => {
    console.log(data)
  }

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className='flex flex-col bg-white rounded mt-2'>
      <div className='flex w-full'>
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            selected={item.title === selectedTab}
            setSelectedTab={changeSelectedTab}
          />
        ))}
      </div>
      <form className="flex p-4" onSubmit={handleSubmit(handleCreatePost)}>
        <FormProvider {...newPostForm}>
          {selectedTab === 'Post' && (
            <TextInputs />
          )}
          {selectedTab === 'Images & Video' && (
            <ImageUpload
              onSelectImage={handleSelectImage}
              setSelectedTab={changeSelectedTab}
              selectedFile={selectedFile}
              setSelectedFile={changeSelectedFile}
            />
          )}
        </FormProvider>
      </form>
    </div>
  )
}
