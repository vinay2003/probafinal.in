import { PaymentsService } from "./payments.service";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(body: {
        amount: number;
    }): Promise<any>;
    verifyPayment(body: {
        paymentId: string;
        orderId: string;
        signature: string;
        userId: string;
    }): Promise<{
        success: boolean;
    }>;
}
