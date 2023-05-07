import { ReactNode } from "react"
import { Item, MenuItemProps } from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDirectoryMenuStore } from "@/store/directory/useDirectoryMenu";

interface IMenuListItem extends MenuItemProps {
  displayText: string
  communityLink: string
  icon: () => ReactNode
  imageUrl?: string
}

export const MenuListItem = ({ communityLink, displayText, icon, imageUrl, ...props }: IMenuListItem) => {
  const router = useRouter()

  const { actions: { closeDirectory } } = useDirectoryMenuStore()
  return (
    <Item
      {...props}
      className={`
        w-full text-xs
        hover:bg-gray-100
        flex items-center gap-2
        px-2 py-1
        cursor-pointer
        hover:outline-none
        border-l border-l-transparent hover:border-l-gray-500
        transition ease-in duration-200
        ${props.className}
      `}
      onClick={() => router.push(communityLink)}
      onSelect={closeDirectory}
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
