"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { useToast } from "@/app/components/ui/hooks/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { v4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMemberCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";



const CreateChatButton = ({ isLarge }: { isLarge?: boolean }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);

    const createNewChat = async () => {
        // Create a chat's logic 
        if (!session?.user.id) return;

        setLoading(true);
        toast({
            title: "Creating new Chat",
            description: "Please wait while we create your new chat.",
            duration: 3000,
        });

        // Check if user is pro and limit the chat creation
        const noOfChats = (await getDocs(chatMemberCollectionGroupRef(session.user.id))
            ).docs.map((doc) => doc.data()).length;

        // Check if the user is about to exceed the PRO plan which is creating upto 3 chats
        const isPro = subscription?.role === "pro" && subscription?.status === "active";

        if (!isPro && noOfChats >= 3) {
            toast({
                title: "Free plan limit exceeded",
                description: "You've exceeded the limit of chats for the FREE plan. Please upgrade to PRO plan to create unlimited chats.",
                variant: "destructive",
                action: (
                    <ToastAction
                    altText="Upgrade"
                    onClick={() => router.push("/register")}
                    >
                        Upgrade to PRO
                    </ToastAction>
                )
            });
            setLoading(false);
            return;
        }

        const chatId = v4();


        await setDoc(addChatRef(chatId, session.user.id), {
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId,
            image: session.user.image || "",
        }).then(() => {
            toast({
                title: "Chat Created",
                description: "Your new chat has been created.",
                duration: 2000,
                className: "bg-green-600 text-white",
            });
            setTimeout(() => {
                router.push(`/chat/${chatId}`);
            }, 1000);
        }).catch((e) => {
            console.log(e);

            toast({
                title: "Error",
                description: "An error occured. Please try again later.",
                variant: "destructive",
            })
        }).finally(() => {
            setLoading(false);
        })
    };

    if (isLarge) {
        return (
            <Button
                onClick={createNewChat}
                variant={"default"}
            >
                {loading ? <LoadingSpinner /> : "Create New Chat"}
            </Button>
        )
    };

    return (
        <Button onClick={createNewChat} variant={"ghost"}>
            <MessageSquarePlusIcon />
        </Button>
    )
}

export default CreateChatButton