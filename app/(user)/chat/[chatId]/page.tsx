// import ChatInput from '@/app/components/ChatInput';
// import ChatMessages from '@/app/components/ChatMessages';
// import { authOptions } from '@/auth';
// import { sortedMessagesRef } from '@/lib/converters/Message';
// import { getDocs } from 'firebase/firestore';
// import { getServerSession } from 'next-auth';
// import React from 'react'

// type Props = {
//     params: {
//         chatId: string,
//     };
// };

// const ChatPage = async({ params: {chatId}}: Props) => {
//     const session = await getServerSession(authOptions);
//     const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc) => doc.data());



//     return (
//         <div>
//             {/* Admin Controls */}
//             {/* Chat MembersBadge */}

//             {/* Chat Messages */}
//             <div className="flex-1">
//                 <ChatMessages
//                 chatId={chatId}
//                 session={session}
//                 initialMessages = {initialMessages}
//                 />
//             </div>

//             {/* Chat Input */}
//             <ChatInput chatId={chatId} />
//         </div>
//     )
// }

// export default ChatPage


import React from 'react';
import ChatInput from '@/app/components/ChatInput';
import ChatMessages from '@/app/components/ChatMessages';
import { authOptions } from '@/auth';
import { sortedMessagesRef } from '@/lib/converters/Message';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import ChatMembersBadge from '@/app/components/ChatMembersBadge';
import AdminControls from '@/app/components/AdminControls';
import { chatMemberRef } from '@/lib/converters/ChatMembers';
import { redirect } from 'next/navigation';

type Props = {
    params: {
        chatId: string,
    };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
    const session = await getServerSession(authOptions);
    const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc) => doc.data());


    const hasAccess = (await getDocs(chatMemberRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

    if(!hasAccess) redirect("/chat?error=permission");


    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto">
                {/* Admin Controls */}
                <AdminControls chatId={chatId} />
                {/* Chat MembersBadge */}
                <ChatMembersBadge chatId={chatId} />

                {/* Chat Messages */}
                <ChatMessages
                    chatId={chatId}
                    session={session}
                    initialMessages={initialMessages}
                />
            </div>

            {/* Chat Input */}
            <div className="sticky rounded-t-xl bottom-0 z-50 bg-white dark:bg-gray-800">
                <ChatInput chatId={chatId} />
            </div>
        </div>
    );
};

export default ChatPage;