import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class SubscriptionGuard implements CanActivate {
    constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.headers['x-user-id']; // Assuming frontend sends this

        if (!userId) {
            throw new ForbiddenException('User ID not provided');
        }

        if (!this.firebaseApp) return true; // Fail open if firebase not configured (dev mode)

        const db = this.firebaseApp.firestore();
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) throw new ForbiddenException('User not found');

        const userData = userDoc.data();
        if (userData?.subscriptionTier !== 'pro') {
            throw new ForbiddenException('Pro subscription required');
        }

        return true;
    }
}
