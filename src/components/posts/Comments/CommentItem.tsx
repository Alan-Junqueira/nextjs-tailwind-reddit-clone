import { Comment } from "@/@types/Comment"
import moment from "moment"
import Image from "next/image"
import { HTMLAttributes } from "react"
import { FaReddit } from "react-icons/fa"
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5"

interface ICommentItem extends HTMLAttributes<HTMLDivElement> {
  comment: Comment
  handleDeleteComment: (comment: Comment) => {}
  userId?: string
  isDeleting: boolean
}

export const CommentItem = ({ comment, handleDeleteComment, userId, isDeleting, ...props }: ICommentItem) => {
  return (
    <div
      {...props}
      className={`
        flex gap-2
        ${props.className}`
      }
    >
      <div>
        <FaReddit size={30} className="text-gray-300" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px]">
          <span className="font-bold">{comment.creatorDisplayText}</span>
          <span className="text-gray-600">{moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}</span>
          {isDeleting && (
            <>
              <Image
                src="/assets/images/6-dots-rotate.svg"
                width={20}
                height={20}
                alt="carregando"
              />
              <span className="text-[10px]">Deleting</span>
            </>
          )}
        </div>
        <p className="text-sm">
          {comment.text}
        </p>
        <div className="flex items-center gap-2 text-gray-500 cursor-pointer">
          <IoArrowUpCircleOutline />
          <IoArrowDownCircleOutline />
          {userId === comment.creatorId && (
            <>
              <span className="text-xs hover:text-blue-500">Edit</span>
              <span
                className="text-xs hover:text-blue-500"
                onClick={() => handleDeleteComment(comment)}
              >
                Delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
