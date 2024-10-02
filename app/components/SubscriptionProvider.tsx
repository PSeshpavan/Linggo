'use client'

import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { error } from "console";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

const SubscriptionProvider = ({
        children,
    }: {
        children: React.ReactNode
}) => {
    const { data: session } = useSession();
    const setSubscription = useSubscriptionStore(
        (state) => state.setSubcription
    )

    useEffect(() => {
        if (!session) return;

        return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
            if (snapshot.empty) {
                console.log("user has NO Subscription.");
                // set no subscription
                setSubscription(null);
                return;
            } else {
                console.log("user has Subscription.");

                // set Subscription
                setSubscription(snapshot.docs[0].data());
            }
        }, (error) => {
            console.log("Erorr getting subscription: ", error);
        })
    }, [session]);

    return (
        <div>{children}</div>
    )
}

export default SubscriptionProvider