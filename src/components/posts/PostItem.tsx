'use client'

import { Post } from "@/@types/Post"
import moment from "moment";
import Image from "next/image";
import { HTMLAttributes } from "react"

import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

interface IPostItem extends HTMLAttributes<HTMLDivElement> {
  post: Post;
  userIsCreator: boolean
  userVoteValue?: number
  onVote: () => void
  onSelectPost: () => void
  onDeletePost: () => void
}
export const PostItem = ({ onDeletePost, onSelectPost, onVote, post, userIsCreator, userVoteValue, ...props }: IPostItem) => {
  return (
    <div
      {...props}
      className={
        `flex border border-gray-300 rounded bg-white
        cursor-pointer
        hover:border-gray-500
        ${props.className}
      `}
      onClick={onSelectPost}
    >
      <div className="flex flex-col items-center bg-gray-100 p-2 w-10 rounded">
        {userVoteValue === 1 ?
          <IoArrowUpCircleSharp size={22} className="text-brand-100 cursor-pointer" onClick={onVote} /> :
          <IoArrowUpCircleOutline size={22} className="text-gray-400 cursor-pointer hover:text-brand-100" onClick={onVote} />
        }
        <span className="text-xs">{post.voteStatus}</span>
        {userVoteValue === -1 ?
          <IoArrowDownCircleSharp size={22} className="text-down-100 cursor-pointer" onClick={onVote} /> :
          <IoArrowDownCircleOutline size={22} className="text-gray-400 cursor-pointer hover:text-down-100" onClick={onVote} />
        }
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-1 p-2.5">
          <div className="flex gap-0.5 items-center text-xs">
            {/* Home page check */}
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
              <Image src={post.imageUrl} width={400} height={460} alt="Post Image" priority className="w-full h-auto" />
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
              onClick={onDeletePost}
            >
              <AiOutlineDelete />
              <span className="text-xs">Delete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
