"use client"

import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

async function syncFirebaseAuth(session: Session) {

    if (typeof window === 'undefined') return; 

    if (session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken);
        } catch (e) {
            console.error("Error signing in with custom token: ", e)
        }
    } else {
        auth.signOut();
    }
}


const FirebaseAuthProvider = ({
    children, }
    : {
        children: React.ReactNode;
    }) => {


    const { data: session } = useSession();
    useEffect(() => {
        if (!session) return;
        syncFirebaseAuth(session);
    }, [session])
    return (
        <div>{children}</div>
    )
}

export default FirebaseAuthProvider