import { authOptions } from '@/auth';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { chatMemberCollectionGroupRef } from "@/lib/converters/ChatMembers";
import ChatListRows from './ChatListRows';



const ChatList = async () => {
    const session = await getServerSession(authOptions);

    const chatsSnapShot = await getDocs(
        chatMemberCollectionGroupRef(session?.user.id!)
    );

    const initialChats = chatsSnapShot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: null,
    }));

    
    return <ChatListRows initialChats= {initialChats} />
}

export default ChatList