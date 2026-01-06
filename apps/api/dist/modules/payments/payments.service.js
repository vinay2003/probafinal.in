"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const razorpay_1 = require("razorpay");
const admin = require("firebase-admin");
let PaymentsService = class PaymentsService {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
            this.razorpay = new razorpay_1.default({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });
        }
    }
    async createOrder(amount, currency = "INR") {
        if (!this.razorpay)
            throw new common_1.BadRequestException("Razorpay not configured");
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,
        };
        try {
            const order = await this.razorpay.orders.create(options);
            return order;
        }
        catch (_a) {
            throw new common_1.BadRequestException("Could not create order");
        }
    }
    async verifyPayment(paymentId, orderId, signature, userId) {
        if (!this.razorpay)
            throw new common_1.BadRequestException("Razorpay not configured");
        if (this.firebaseApp) {
            const db = this.firebaseApp.firestore();
            await db.collection("users").doc(userId).set({
                subscriptionTier: "pro",
                subscriptionDate: new Date().toISOString(),
            }, { merge: true });
        }
        return { success: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("FIREBASE_APP")),
    __metadata("design:paramtypes", [Object])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map