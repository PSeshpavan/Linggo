import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";


// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "linggo-c3b57.firebaseapp.com",
    projectId: "linggo-c3b57",
    storageBucket:  "linggo-c3b57.appspot.com",
    messagingSenderId: "580061755867",
    appId: "1:580061755867:web:8aa586262fbc4311748ffe"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);   
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);


export { db, auth, functions };
