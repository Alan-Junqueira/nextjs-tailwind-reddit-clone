'use client'

import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BiPoll } from 'react-icons/bi'
import { TabItem as TabItemType } from "@/@types/TabItem"
import { TabItem } from './TabItem'
import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { TextInputs } from './postform/TextInputs'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUpload } from './postform/ImageUpload'
import { User } from 'firebase/auth'
import { useParams, useRouter } from 'next/navigation'
import { Post } from '@/@types/Post'
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '@/libs/firebase/clientApp'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { AlertError } from '../AlertError'
import { useSelectedFile } from '@/hooks/useSelectedFile'
import { getUserFromEmail } from '@/utils/get-user-from-email'

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

interface INewPostForm extends HTMLAttributes<HTMLDivElement> {
  user: User
  communityImageUrl?: string
}

export const NewPostForm = ({ user, communityImageUrl, ...props }: INewPostForm) => {
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);

  const { changeSelectedFile, handleSelectFile, selectedFile, } = useSelectedFile()

  const router = useRouter()
  const { communityId } = useParams()

  const newPostForm = useForm<NewPostFormInputs>({
    resolver: zodResolver(newPostFormSchema)
  })
  const { handleSubmit, formState: { errors }, setError, reset } = newPostForm

  const changeSelectedTab = (selectedTab: string) => {
    setSelectedTab(selectedTab);
  }

  const handleCreatePost = async (data: NewPostFormInputs) => {
    try {
      setError('root', { message: "" })
      const { textBody, title } = data
      const newPost: Post = {
        communityId: communityId as string,
        communityImageUrl: communityImageUrl || '',
        creatorId: user.uid,
        creatorDisplayName: getUserFromEmail(user.email!),
        title,
        textBody,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
      }

      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        //* format 'data_url is because the method used to convert the file were readAsDataURL
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadURL = await getDownloadURL(imageRef)

        await updateDoc(postDocRef, {
          imageUrl: downloadURL
        })
      }
      reset()
      router.back()
    } catch (error: any) {
      console.log('handleCreatePost error', error.message)
      setError('root', { message: "Error creating post" })
    }
  }

  return (
    <div {...props} className={`flex flex-col bg-white rounded mt-2 ${props.className}`}>
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
              onSelectImage={handleSelectFile}
              setSelectedTab={changeSelectedTab}
              selectedFile={selectedFile}
              setSelectedFile={changeSelectedFile}
            />
          )}
        </FormProvider>
      </form>
      {errors.root?.message && <AlertError status='error' textLabel={errors.root.message} />}
    </div>
  )
}
