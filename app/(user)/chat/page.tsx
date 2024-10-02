import ChatList from "@/app/components/ChatList";
import ChatPermissionError from "@/app/components/ChatPermissionError";



type Props = {
    params:{};
    searchParams:{
        error: string; 
    };
}

const ChatsPage = ({ searchParams: { error }}: Props) => {
    return (
        <div>
            {error && (
                <div className="m-2">
                    <ChatPermissionError />
                </div>
            )}
            {/* ChatList */}
            <ChatList />
        </div>
    )
}

export default ChatsPage