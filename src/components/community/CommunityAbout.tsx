'use client'

import { Community } from '@/@types/Community'
import moment from 'moment'
import Link from 'next/link'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiCakeLine } from 'react-icons/ri'
import { Button } from '../Button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore, storage } from '@/libs/firebase/clientApp'
import { useSelectedFile } from '@/hooks/useSelectedFile'
import Image from 'next/image'
import { FaReddit } from 'react-icons/fa'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useCommunityStore } from '@/store/community/useCommunityStore'

interface ICommunityAbout extends HTMLAttributes<HTMLDivElement> {
  communityData: Community
}

export const CommunityAbout = ({ communityData, ...props }: ICommunityAbout) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const [user] = useAuthState(auth)

  const selectedFileRef = useRef<HTMLInputElement>(null)

  const { actions: { updateCommunityImageUrl, getCurrentCommunity } } = useCommunityStore()

  const { handleSelectFile, selectedFile } = useSelectedFile()

  const handleUpdateImage = async () => {
    if (!selectedFile) return

    try {
      setUploadingImage(true)

      const imageRef = ref(storage, `communities/${communityData.id}/image`)
      await uploadString(imageRef, selectedFile, 'data_url')
      const downloadUrl = await getDownloadURL(imageRef)
      await updateDoc(doc(firestore, 'communities', communityData.id), {
        imageUrl: downloadUrl
      })

      updateCommunityImageUrl(downloadUrl)

    } catch (error: any) {
      console.log('handleUpdateImage error', error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  useEffect(() => {
    getCurrentCommunity(communityData.id)
  }, [communityData.id, getCurrentCommunity])

  return (
    <div
      {...props}
      className={`
        sticky top-3.5 w-full
        ${props.className}`
      }
    >
      <div className="flex justify-between items-center bg-blue-400 text-white p-3 rounded-tl rounded-tr">
        <p className='text-xs font-bold'>About Community</p>
        <HiOutlineDotsHorizontal />
      </div>
      <div className="flex flex-col p-3 bg-white rounded-bl rounded-br">
        <div className="flex">
          <div className="flex w-full p-2 text-xs font-bold">
            <div className="flex flex-col flex-grow">
              <span>{communityData.numberOfMembers.toLocaleString()}</span>
              <span>Members</span>
            </div>
            <div className="flex flex-col flex-grow">
              <span>1</span>
              <span>Online</span>
            </div>
          </div>
        </div>
        <hr className='w-full h-[1px] bg-gray-300 mb-2' />
        <div className="flex gap-2 items-center w-full p-1 font-medium text-xs">
          <RiCakeLine size={18} />
          <span>Created
            {communityData.createdAt &&
              <> {moment(new Date(communityData.createdAt.seconds * 1000)).format('MMM DD, YYYY')}</>
            }
          </span>
        </div>
        <Link href={`r/${communityData.id}/submit`} className='mt-3 w-full'>
          <Button className='w-full h-8'>Create Post</Button>
        </Link>
        {user?.uid === communityData.creatorId && (
          <>
            <hr className='w-full h-[1px] bg-gray-300 my-2' />
            <div className="flex flex-col gap-1 text-xs">
              <h4 className='font-semibold'>Admin</h4>
              <div className="flex items-center justify-between">
                <span
                  className='text-blue-400 cursor-pointer hover:underline'
                  onClick={() => selectedFileRef.current?.click()}
                >
                  Change Image
                </span>
                {communityData.imageUrl || selectedFile ? (
                  <div className='w-10 h-10 relative'>
                    <Image
                      src={selectedFile as string || communityData.imageUrl as string}
                      alt='Community Image'
                      fill
                      className='rounded-full object-cover'
                    />
                  </div>
                ) : (
                  <FaReddit size={40} className='text-brand-100 mr-2' />
                )}
              </div>
              {selectedFile && (
                (uploadingImage ? (
                  <Image
                    src="/assets/images/6-dots-rotate.svg"
                    width={20}
                    height={20}
                    alt="carregando"
                  />) :
                  <h6 className='cursor-pointer' onClick={handleUpdateImage}>Save Changes</h6>
                )
              )}
              <input
                id='file-upload'
                type='file'
                accept='image/x-png,image/gif,image/jpeg'
                hidden
                ref={selectedFileRef}
                onChange={handleSelectFile}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
