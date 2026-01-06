import * as admin from "firebase-admin";
export declare class PaymentsService {
    private firebaseApp;
    private razorpay;
    constructor(firebaseApp: admin.app.App);
    createOrder(amount: number, currency?: string): Promise<any>;
    verifyPayment(paymentId: string, orderId: string, signature: string, userId: string): Promise<{
        success: boolean;
    }>;
}
