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
exports.SubscriptionGuard = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let SubscriptionGuard = class SubscriptionGuard {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request.headers["x-user-id"];
        if (!userId) {
            throw new common_1.ForbiddenException("User ID not provided");
        }
        if (!this.firebaseApp)
            return true;
        const db = this.firebaseApp.firestore();
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists)
            throw new common_1.ForbiddenException("User not found");
        const userData = userDoc.data();
        if ((userData === null || userData === void 0 ? void 0 : userData.subscriptionTier) !== "pro") {
            throw new common_1.ForbiddenException("Pro subscription required");
        }
        return true;
    }
};
exports.SubscriptionGuard = SubscriptionGuard;
exports.SubscriptionGuard = SubscriptionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("FIREBASE_APP")),
    __metadata("design:paramtypes", [Object])
], SubscriptionGuard);
//# sourceMappingURL=subscription.guard.js.map