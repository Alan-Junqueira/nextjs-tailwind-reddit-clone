import { ReactNode } from "react"
import { Item, MenuItemProps } from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IMenuListItem extends MenuItemProps {
  displayText: string
  communityLink: string
  icon: () => ReactNode
  imageUrl?: string
}

export const MenuListItem = ({ communityLink, displayText, icon, imageUrl, ...props }: IMenuListItem) => {
  const router = useRouter()
  return (
    <Item
      {...props}
      className={`
        w-full text-xs
        hover:bg-gray-100
        flex items-center gap-2
        px-2 py-1
        cursor-pointer
        ${props.className}
      `}
      onClick={() => router.push(communityLink)}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          className="rounded-full"
          width={18}
          height={18}
          alt=""
        />
      ) : (
        icon()
      )}
      <span>{displayText}</span>
    </Item>
  )
}
