'use client';
import React, { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./ui/form";
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from 'next-auth/react';
import { useToast } from "./ui/hooks/use-toast";
import useAdminId from "../hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Input } from "./ui/input";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMemberRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";
import { useRouter } from "next/navigation";
import ShareLink from "./ShareLink";

const forSchme = z.object({
    email: z.string().email("Please enter a valid email address"),
})

const InviteUser = ({ chatId }: { chatId: string }) => {
    const { data: session } = useSession();
    const {toast} = useToast();
    const adminId = useAdminId({ chatId });
    const subscription = useSubscriptionStore((state) => state.subscription);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);

    const form = useForm<z.infer<typeof forSchme>>({
        resolver: zodResolver(forSchme),
        defaultValues: {
            email: "",
        },
    });


    async function onSubmit(values: z.infer<typeof forSchme>) {
        if (!session?.user.id) return;

        toast({
            title: "Inviting User...",
            description: "We are inviting this user to the chat.",
        });

        const noOfUsersInChat = (await getDocs(chatMemberRef(chatId))).docs.map((doc) => doc.data()).length;

        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if(!isPro && noOfUsersInChat >= 2) {
            toast({
                title: "Free plan limit exceeded",
                description: "You need a PRO plan to add more than 2 users to a chat.",
                variant: "destructive",
                action: (
                    <ToastAction
                    altText="Upgrade"
                    onClick = {() => router.push("/register")}
                    >
                        Upgrade to PRO
                    </ToastAction>
                )
            });
            return;
        }
            const querySnapsot = await getDocs(getUserByEmailRef(values.email));

            if(querySnapsot.empty) {
                toast({
                    title: "User not found",
                    description: "Please enter a valid email address OR send them the invitation once they have signed up!",
                    variant: "destructive",
                });
                return;
            } else {
                const user = querySnapsot.docs[0].data();

                await setDoc(addChatRef(chatId, user.id), {
                    userId: user.id!,
                    email: user.email!,
                    timestamp: serverTimestamp(),
                    chatId: chatId,
                    isAdmin: false,
                    image: user.image || "",
                }).then(() => {
                    setOpen(false);
                    toast({
                        title: "User Added",
                        description: "User has been added to the chat successfully!",
                        className: "bg-green-600 text-white",
                        duration: 3000,
                    });
                    setOpenInviteLink(true);
                }).catch((error) => {
                    toast({
                        title: "Error",
                        description: "There was an error inviting the user. Please try again.",
                        variant: "destructive",
                    });

                    setOpen(false);
                });
            }
            form.reset();
    }


    return (
        adminId === session?.user.id && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className='max-[450px]:w-32 max-[450px]:p-2'>
                            <PlusCircleIcon className="mr-1" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Invite a User to the Chat</DialogTitle>
                            <DialogDescription>
                                Enter the email of the user you want to invite to this chat! {" "}
                                <span className="text-indigo-600 font-bold">
                                    (Note: They mst be registered)
                                </span>
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="ram@man.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit" className="ml-auto sm:w-fit w-full">Invite to chat</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <ShareLink 
                    isOpen={openInviteLink}
                    setIsOpen={setOpenInviteLink}
                    chatId={chatId}
                />
            </>
        ))
}

export default InviteUser