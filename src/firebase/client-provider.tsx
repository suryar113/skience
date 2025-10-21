'use client'

import { FirebaseProvider, initializeFirebase } from ".";

export default function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
    const {firebaseApp, auth, firestore} = initializeFirebase()

    return <FirebaseProvider
        firebaseApp={firebaseApp}
        auth={auth}
        firestore={firestore}
    >
        {children}
    </FirebaseProvider>
}