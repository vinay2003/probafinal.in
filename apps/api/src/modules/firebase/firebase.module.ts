import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
    providers: [
        {
            provide: 'FIREBASE_APP',
            useFactory: () => {
                // Initialize Firebase Admin
                // In production, use process.env.GOOGLE_APPLICATION_CREDENTIALS or service account obj
                if (!admin.apps.length) {
                    // Mocking credential or checking env for now. 
                    // The user needs to set this up properly.
                    // keeping it simple for now to avoid crashes if env is missing during scaffold
                    try {
                        return admin.initializeApp({
                            credential: admin.credential.applicationDefault()
                        });
                    } catch (e) {
                        console.warn("Firebase Admin failed to initialize (likely missing creds).");
                        return null;
                    }
                }
                return admin.app();
            },
        },
    ],
    exports: ['FIREBASE_APP'],
})
export class FirebaseModule { }
