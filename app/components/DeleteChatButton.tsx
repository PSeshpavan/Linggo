'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { useToast } from './ui/hooks/use-toast'
import useAdminId from '../hooks/useAdminId'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const adminId = useAdminId({ chatId })


    // const handleDelete = async () => {
    //     toast({
    //         title: 'Deleting Chat',
    //         description: 'Please wait while we delete your chat',
    //     });

    //     console.log("Deleting...", chatId);

    //     await fetch("/api/chat/delete", {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ chatId: chatId }),
    //     }).then((res) => {
    //         toast({
    //             title: 'Chat Deleted',
    //             description: 'Your chat has been deleted',
    //             className: 'bg-green-600 text-white',
    //             duration: 3000,
    //         });
    //         router.replace('/chat');
    //     }).catch((err) => {
    //         console.log("Error Deleting the Message",err);
    //         toast({
    //             title: 'Error',
    //             description: 'Something went wrong',
    //             variant: 'destructive',
    //         });
    //     }).finally(() => {
    //         setOpen(false);
    //     })
    // }
    const handleDelete = async () => {
        toast({
            title: 'Deleting Chat',
            description: 'Please wait while we delete your chat',
        });
    
        console.log("Deleting...", chatId);
    
        try {
            const response = await fetch("/api/chat/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chatId: chatId }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.success) {
                toast({
                    title: 'Chat Deleted',
                    description: 'Your chat has been deleted',
                    className: 'bg-green-600 text-white',
                    duration: 3000,
                });
                router.replace('/chat');
            } else {
                throw new Error('Failed to delete chat');
            }
        } catch (err) {
            console.error("Error Deleting the Chat:", err);
            toast({
                title: 'Error',
                description: 'Something went wrong while deleting the chat',
                variant: 'destructive',
            });
        } finally {
            setOpen(false);
        }
    }


    return session?.user.id === adminId && (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='destructive' className='max-[450px]:w-32 max-[450px]:p-1'>Delete Chat</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your chat.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 space-x-2">

                    <Button
                        variant='destructive'
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                    <Button variant={"outline"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChatButton