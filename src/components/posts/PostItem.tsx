'use client'

import { Post } from "@/@types/Post"
import moment from "moment";
import Image from "next/image";
import { HTMLAttributes, MouseEvent, Suspense, useState } from "react"

import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { ImageSkeleton } from "../skeletons/ImageSkeleton";
import { AlertError } from "../AlertError";
import { User } from "firebase/auth";
import { useAuthModalStore } from "@/store/modal/useAuthModalStore";
import { useRouter } from "next/navigation";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";

interface IPostItem extends HTMLAttributes<HTMLDivElement> {
  post: Post;
  userIsCreator: boolean
  userVoteValue?: number
  onVote: (post: Post, vote: number, communityId: string, user: User) => void
  onSelectPost?: (post: Post) => void
  onDeletePost: (post: Post) => Promise<boolean>
  user?: User | null
  homePage?: boolean
}
export const PostItem = ({ onDeletePost, onSelectPost, onVote, post, userIsCreator, userVoteValue, user, homePage, ...props }: IPostItem) => {
  const [deletePostError, setDeletePostError] = useState<string>('');
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const router = useRouter()

  const { actions: { openModal } } = useAuthModalStore()

  const singlePostPage = !onSelectPost

  const handleDeletePost = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    deletePostError && setDeletePostError('')
    try {
      setIsDeletingPost(true)
      const success = await onDeletePost(post)

      if (!success) {
        throw new Error('Failed to delete post')
      }

      console.log('Post was successfully deleted')
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`)
      }
    } catch (error: any) {
      setDeletePostError(error.message)
    } finally {
      setIsDeletingPost(false)
    }
  }

  const handleMinusVote = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()

    if (!user) {
      openModal('login')
      return
    }
    onVote(post, -1, post.communityId, user)
  }

  const handlePlusVote = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    if (!user) {
      openModal('login')
      return
    }

    onVote(post, 1, post.communityId, user)
  }

  const handleSectPost = () => {
    if (onSelectPost) {
      onSelectPost(post)
      router.push(`/r/${post.communityId}/comments/${post.id}`)
    }
  }

  return (
    <div
      {...props}
      className={
        `flex border 
        ${singlePostPage ?
          'border-white rounded-tl rounded-tr'
          :
          'border-gray-300 rounded hover:border-gray-500 cursor-pointer'
        } 
        bg-white
        ${props.className}
      `}
      onClick={handleSectPost}
    >
      <div className={
        `flex flex-col items-center
         ${singlePostPage ?
          'bg-none'
          :
          'bg-gray-100 rounded-tl rounded-bl'
        } 
         p-2 w-10`
      }>
        {userVoteValue === 1 ?
          <IoArrowUpCircleSharp
            size={22}
            className="text-brand-100 cursor-pointer"
            onClick={handlePlusVote}
          /> :
          <IoArrowUpCircleOutline
            size={22}
            className="text-gray-400 cursor-pointer hover:text-brand-100"
            onClick={handlePlusVote}
          />
        }
        <span className="text-xs">{post.voteStatus}</span>
        {userVoteValue === -1 ?
          <IoArrowDownCircleSharp
            size={22}
            className="text-down-100 cursor-pointer"
            onClick={handleMinusVote} /> :
          <IoArrowDownCircleOutline
            size={22}
            className="text-gray-400 cursor-pointer hover:text-down-100"
            onClick={handleMinusVote}
          />
        }
      </div>
      <div className="flex flex-col w-full">
        {deletePostError && <AlertError status='error' textLabel={deletePostError} />}
        <div className="flex flex-col gap-1 p-2.5">
          <div className="flex gap-0.5 items-center text-xs">
            {/* Home page check */}
            {homePage && (
              <>
                {post.communityImageUrl ? (
                  <div className='w-[18px] h-[18px] relative'>
                    <Image
                      src={post.communityImageUrl}
                      alt='Community Image'
                      fill
                      className='rounded-full object-cover mr-1'
                    />
                  </div>
                ) : (
                  <FaReddit size={18} className="mr-1 text-blue-500" />
                )}
                <Link
                  href={`r/${post.communityId}`}
                  className="font-bold hover:underline text-[10px]"
                  onClick={e => e.stopPropagation()}
                >
                  {post.communityId}
                </Link>
                <BsDot size={8} className="text-gray-500" />
              </>
            )}
            <p className="text-[9px] text-gray-400">Posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}</p>
          </div>
          <h3 className="text-sm font-semibold">
            {post.title}
          </h3>
          <p className="text-xs">
            {post.textBody}
          </p>
          {post.imageUrl && (
            <div className="flex items-center justify-center p-2">
              <Suspense fallback={<ImageSkeleton />}>
                <Image
                  src={post.imageUrl}
                  width={400}
                  height={460}
                  alt="Post Image"
                  priority
                  className="w-full h-auto"
                />
              </Suspense>
            </div>
          )}
        </div>
        <div className="flex ml-1 mb-0.5 text-gray-500">
          <div className="flex items-center gap-2 py-2 px-2.5 rounded cursor-pointer hover:bg-gray-200">
            <BsChat />
            <span className="text-xs">{post.numberOfComments}</span>
          </div>
          <div className="flex items-center gap-2 py-2 px-2.5 rounded cursor-pointer hover:bg-gray-200">
            <IoArrowRedoOutline />
            <span className="text-xs">Share</span>
          </div>
          <div className="flex items-center gap-2 py-2 px-2.5 rounded cursor-pointer hover:bg-gray-200">
            <IoBookmarkOutline />
            <span className="text-xs">Save</span>
          </div>
          {userIsCreator && (
            <div
              className="flex items-center gap-2 py-2 px-2.5 rounded cursor-pointer hover:bg-gray-200"
              onClick={handleDeletePost}
            >
              {isDeletingPost ? (
                <>
                  <Image
                    src="/assets/images/6-dots-rotate.svg"
                    width={20}
                    height={20}
                    alt="carregando"
                  />
                  <span className="text-xs">Deleting</span>
                </>
              ) : (
                <>
                  <AiOutlineDelete />
                  <span className="text-xs">Delete</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
