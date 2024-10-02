'use client'

import { ChatMembers, chatMemberRef } from '@/lib/converters/ChatMembers'
import React, { use } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useAdminId from '../hooks/useAdminId'
import LoadingSpinner from './LoadingSpinner'
import UserAvatar from './UserAvatar'
import { Badge } from './ui/badge'

const ChatMembersBadge = ({ chatId }: { chatId: string }) => {
    const [members, loading, error] = useCollectionData<ChatMembers>(
        chatMemberRef(chatId)
    );
    const adminId = useAdminId({ chatId });

    if (loading && !members) return <LoadingSpinner />;


    return (
        !loading && (
            <div className="p-2 border rounded-xl m-5">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
                    {members?.map((member) => (

                        <Badge
                            variant='secondary'
                            key={member.email}
                            className='h-14 p-5 pl-2 pr-6 flex-space-x-2'
                        >
                            <div className="flex items-center space-x-2 mr-2">
                                <UserAvatar name={member.email} image={member.image} />
                            </div>

                            <div className="">
                                <p>{member.email}</p>
                                {member.userId === adminId && (
                                    <p className="animate-pulse text-indigo-400">Admin</p>
                                )}
                            </div>
                        </Badge>
                    ))}
                </div>
            </div>
        )
    )
}

export default ChatMembersBadge