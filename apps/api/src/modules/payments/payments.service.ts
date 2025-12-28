import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import Razorpay from 'razorpay';
import * as admin from 'firebase-admin';

@Injectable()
export class PaymentsService {
    private razorpay: any;

    constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) {
        if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
            this.razorpay = new (Razorpay as any)({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
        }
    }

    async createOrder(amount: number, currency: string = 'INR') {
        if (!this.razorpay) throw new BadRequestException('Razorpay not configured');

        const options = {
            amount: amount * 100, // amount in paisa
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        try {
            const order = await this.razorpay.orders.create(options);
            return order;
        } catch (error) {
            throw new BadRequestException('Could not create order');
        }
    }

    async verifyPayment(paymentId: string, orderId: string, signature: string, userId: string) {
        if (!this.razorpay) throw new BadRequestException('Razorpay not configured');
        // Verification logic (crypto hmac check)
        // crypto.createHmac... 
        // mocking success and updating user in Firebase

        // Update User in Firestore
        if (this.firebaseApp) {
            const db = this.firebaseApp.firestore();
            await db.collection('users').doc(userId).set({
                subscriptionTier: 'pro',
                subscriptionDate: new Date().toISOString()
            }, { merge: true });
        }

        return { success: true };
    }
}
