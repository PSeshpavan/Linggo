"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { limitedMessageRef, messageRef, User } from "@/lib/converters/Message";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/hooks/use-toast";
import { ToastAction } from "./ui/toast";

const formSchema = z.object({
    input: z.string().max(1000),
})

const ChatInput = ({ chatId }: { chatId: string }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        }
    });
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const inputCopy = values.input.trim();
        form.reset();

        if(inputCopy.length === 0) return;

        if(!session?.user) return;


        const messges = (await getDocs(limitedMessageRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length;

        const isPro = subscription?.role === "pro" && subscription.status === "active";

        if(!isPro && messges >= 20) {
            toast({
                title: "Free plan limit exceeded",
                description: "You have exceeded the limit of 20 messages. Please upgrade to pro to continue using the app.",
                variant: "destructive",
                action: (
                    <ToastAction 
                    altText="Upgrade"
                    onClick={() => router.push("/register")}
                    >
                        Upgrade to pro
                        </ToastAction>
                ),
            });

            return;
        };

        const userToStore: User = {
            id: session.user.id,
            name: session.user.name!,
            image: session.user.image!,
            email: session.user.email!,
        };

        addDoc(messageRef(chatId), {
            input: inputCopy,
            timestamp: serverTimestamp(),
            user: userToStore,
        });

        
    } 


    return (
        <div className='sticky bottom-0'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800'
                >
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormControl>
                                    <Input
                                        placeholder='Type a message...'
                                        className='border-none bg-transparent dark:placeholder:text-white/70'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='bg-violet-500 text-white'>
                        Send
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ChatInput;