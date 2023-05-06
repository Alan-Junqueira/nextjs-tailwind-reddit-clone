'use client'

import { Community } from '@/@types/Community';
import { auth, firestore } from '@/libs/firebase/clientApp';
import { useCommunityStore } from '@/store/community/useCommunityStore';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { MouseEvent, useEffect, useState } from 'react'
import { TopCommunitiesSkeleton } from '../skeletons/TopCommunitiesSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import { FaReddit } from 'react-icons/fa';
import { Button } from '../Button';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Recommendations = () => {
  const [user] = useAuthState(auth)
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { actions: { onJoinOrLeaveCommunity }, state: { mySnippets } } = useCommunityStore()

  const getCommunityRecommendations = async () => {
    try {
      setIsLoading(true)
      const communityQuery = query(
        collection(firestore, 'communities'),
        orderBy('numberOfMembers', 'desc'),
        limit(5)
      )
      const communityDocs = await getDocs(communityQuery)
      const communities = communityDocs.docs.map(doc => ({
        id: doc.id, ...doc.data()
      })) as Community[]

      setCommunities(communities)

    } catch (error) {
      console.log('getCommunityRecommendations error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinCommunity = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, community: Community, isJoined: boolean) => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    onJoinOrLeaveCommunity(community, user, isJoined)
  }

  useEffect(() => {
    getCommunityRecommendations()
  }, [])

  return (
    <div className="flex flex-col w-full h-fit bg-white rounded border border-gray-300">
      <div
        className="
          flex items-end 
          text-white font-bold
          py-1.5 px-2.5 h-[70px] rounded-t
          bg-card-top-communities
          bg-cover
        ">
        Top Communities
      </div>
      <div className="flex flex-col">
        {isLoading ? (
          <TopCommunitiesSkeleton />
        ) : (
          <>
            {communities.map((community, index) => {
              const isJoined = !!mySnippets.find(snippet => snippet.communityId === community.id)
              return (
                <Link key={community.id} href={`/r/${community.id}`}>
                  <div className="flex items-center text-xs border-b border-b-gray-200 py-2.5 px-3 relative">
                    <div className="flex w-4/5 items-center">
                      <div className="flex w-2/12">
                        <span>{index + 1}</span>
                      </div>
                      <div className="flex items-center w-9/12">
                        {community.imageUrl ? (
                          <Image
                            src={community.imageUrl}
                            alt={community.id}
                            width={28}
                            height={28}
                            className='rounded-full md:mr-2'
                          />
                        ) : (
                          <FaReddit size={30} className='text-brand-100 mr-2' />
                        )}
                        <span className='truncate'>{`r/${community.id}`}</span>
                      </div>
                    </div>
                    <div className='absolute right-2.5'>
                      <Button
                        className='h-6'
                        variant={isJoined ? 'outline' : 'solid'}
                        onClick={(e) => handleJoinCommunity(e, community, isJoined)}
                      >
                        {isJoined ? 'Joined' : 'Join'}
                      </Button>
                    </div>
                  </div>
                </Link>
              )
            })}
            <div className='py-2.5 px-5'>
              <Button className='h-7 w-full'>View All</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
