'use client'
import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/hooks/use-toast";

const ShareLink = ({
    isOpen,
    setIsOpen,
    chatId
}: {
    isOpen: boolean,
    chatId: string
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}) => {
    const { toast } = useToast();
    const host = window.location.host;

    const linkToChat = process.env.NODE_ENV === "development" ? `http://${host}/chat/${chatId}` : `https://${host}/chat/${chatId}`;

    async function copyToClipBoard() {
        try {
            await navigator.clipboard.writeText(linkToChat);
            console.log("copied to clipboard");
            toast({
                title: "Copied!",
                description: "Link to chat copied to clipboard",
                className: "bg-green-600 text-white",
            });
        } catch (error) {
            console.log("Failed to copy", error);
            //     toast({
            //         title: "Error",
            //         description: "Could not copy to clipboard",
            //         variant: "destructive",
            //     });
            // }
        }
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            defaultOpen={isOpen}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className='max-[450px]:w-32 max-[450px]:p-2'> 
                    <Copy className="mr-2" />
                    Share Link
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription>
                        Any user who has been{" "}
                        <span className='font-bold text-indigo-600'> granted access </span> {" "}
                        can use this link
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input id="link" defaultValue={linkToChat} readOnly />
                    </div>
                    <Button type="submit" onClick={() => copyToClipBoard()} size="sm" className="px-4 py-5">
                        <span className='sr-only' > Copy </span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareLink