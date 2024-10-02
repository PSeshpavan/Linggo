"use client"

import { db } from '@/firebase'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { useSubscriptionStore } from '@/store/store'
import ManageAccountButton from './ManageAccountButton'



const CheckoutButton = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isLoadingSubscription = subscription === undefined;

  const isSubscribed = subscription?.status === "active" && subscription?.role === "pro";

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    // push document into firebase db
    setLoading(true);

    const docRef = await addDoc(collection(db, 'customers', session.user.id, 'checkout_sessions'), {
      price: "price_1Q04wPB5QU2p62XbxkTcXjDa",
      success_url: `${window.location.origin}/chat`,
      cancel_url: window.location.origin,
    });
    // stripe extension on firebase creates a checkout session
    return onSnapshot(docRef, snap => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occured. ${error.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    })
    // redirect user to checkout page 


  };



  return (
    <div className="flex flex-col space-y-2">
      {/* if subscribed show user is subscribed */}
      {isSubscribed && (
        <div >
          <hr className='mt-5' />
            <p className="pt-5 pb-1 text-center text-sm text-indigo-600">
              You are currently subscribed to PRO.
            </p>
        </div>
      )}

      {/* if not subscribed show sign up button */}
      <button 
        className='mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default'
      >
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
            <LoadingSpinner />
          ) : <button onClick={() => { createCheckoutSession() }}> Sign Up </button>
          }
      </button>
    </div>
  )
}

export default CheckoutButton