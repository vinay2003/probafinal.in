import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

let firebaseApp: FirebaseApp;

// Always initialize with the explicit config on the server.
// The getApps().length check ensures it's a singleton.
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
}

export const firestore: Firestore = getFirestore(firebaseApp);
export { firebaseApp };
