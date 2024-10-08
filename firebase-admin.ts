import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";
//import serviceAccount from "./serviceAccKey.json";

let app;



if (!admin.apps.length) {
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        }),
    });
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
})


// if (!admin.apps.length) {
//     app = admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//     });
// }

// const adminDb = initFirestore({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
// })

const adminAuth = admin.auth(app);

export { adminDb, adminAuth };