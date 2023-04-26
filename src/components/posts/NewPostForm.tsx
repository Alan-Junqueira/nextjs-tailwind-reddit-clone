'use client'

import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BiPoll } from 'react-icons/bi'
import { TabItem as TabItemType } from "@/@types/TabItem"
import { TabItem } from './TabItem'
import { useState } from 'react'

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

export const NewPostForm = () => {
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);

  const changeSelectedTab = (selectedTab: string) => {
    setSelectedTab(selectedTab);
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
    </div>
  )
}
