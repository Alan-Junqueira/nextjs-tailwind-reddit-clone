import { TabItem as TabItemType } from "@/@types/TabItem"

interface ITabItem extends TabItemType {
  selected: boolean
  setSelectedTab: (selectedTab: string) => void
}

export const TabItem = ({ icon, title, selected, setSelectedTab }: ITabItem) => {
  return (
    <div
      className={`
        flex items-center justify-center flex-grow gap-2 
        py-3.5 cursor-pointer
        border-r border-r-gray-200
        hover:bg-gray-50
        ${selected ?
          'text-blue-500 border-b-2 border-b-blue-500'
          :
          'text-gray-500 border-b border-b-gray-200'
        }
      `}
      onClick={() => setSelectedTab(title)}
    >
      <div className="flex items-center h-5 " >
        {icon()}
      </div>
      <p className="text-xs">
        {title}
      </p>
    </div >
  )
}
