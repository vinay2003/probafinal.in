import * as admin from 'firebase-admin';

// Validate environment variables or use application default credentials
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            // databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        console.log("Firebase Admin Initialized successfully.");
    } catch (error) {
        console.warn("Firebase Admin failed to initialize:", error);
    }
}

export const db = admin.apps.length ? admin.firestore() : null;
export const auth = admin.apps.length ? admin.auth() : null;
