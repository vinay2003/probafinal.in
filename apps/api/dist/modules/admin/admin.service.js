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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let AdminService = AdminService_1 = class AdminService {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
        this.logger = new common_1.Logger(AdminService_1.name);
        this.fallbackPlans = [
            {
                name: "Quiz Access",
                price: "49",
                currency: "₹",
                description: "Perfect for exam prep.",
                features: [
                    "Unlimited AI-powered quiz generation",
                    "AI feedback on your answers",
                ],
                active: true,
            },
            {
                name: "Pro Access",
                price: "119",
                currency: "₹",
                description: "The ultimate AI study companion.",
                features: [
                    "Unlimited AI-powered quiz generation",
                    "AI Mock Interview practice",
                    "ATS Resume Optimizer",
                    "Document Summarizer",
                ],
                active: true,
            },
        ];
    }
    async getUsers() {
        if (!this.firebaseApp)
            return [];
        try {
            const snapshot = await this.firebaseApp
                .firestore()
                .collection("users")
                .get();
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.displayName || data.email || "Unknown User",
                    email: data.email || "No Email",
                    plan: data.subscriptionTier
                        ? data.subscriptionTier.charAt(0).toUpperCase() +
                            data.subscriptionTier.slice(1)
                        : "Free",
                    status: "Active",
                    date: data.createdAt
                        ? new Date(data.createdAt.toDate
                            ? data.createdAt.toDate()
                            : data.createdAt)
                            .toISOString()
                            .split("T")[0]
                        : "N/A",
                };
            });
        }
        catch (error) {
            this.logger.error("Failed to fetch users from Firestore", error);
            return [];
        }
    }
    async getUser(id) {
        if (!this.firebaseApp)
            return null;
        const doc = await this.firebaseApp
            .firestore()
            .collection("users")
            .doc(id)
            .get();
        if (!doc.exists)
            return null;
        const data = doc.data();
        return {
            id: doc.id,
            name: data.displayName || data.email || "Unknown User",
            email: data.email || "No Email",
            plan: data.subscriptionTier || "Free",
            status: "Active",
            date: data.createdAt
                ? new Date(data.createdAt.toDate()).toISOString().split("T")[0]
                : "N/A",
        };
    }
    async getPlans() {
        if (!this.firebaseApp)
            return [];
        try {
            const snapshot = await this.firebaseApp
                .firestore()
                .collection("plans")
                .get();
            if (snapshot.empty)
                return this.fallbackPlans;
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        }
        catch (error) {
            this.logger.error("Failed to fetch plans", error);
            return this.fallbackPlans;
        }
    }
    async createPlan(plan) {
        if (!this.firebaseApp)
            throw new Error("Firebase not initialized");
        try {
            const id = plan.name.toLowerCase().replace(/\s+/g, "-");
            const newPlan = Object.assign(Object.assign({}, plan), { id, active: true });
            await this.firebaseApp
                .firestore()
                .collection("plans")
                .doc(id)
                .set(newPlan);
            return newPlan;
        }
        catch (error) {
            this.logger.error("Failed to create plan", error);
            throw error;
        }
    }
    async getStats() {
        if (!this.firebaseApp)
            return { totalUsers: 0, activeSubs: 0 };
        try {
            const usersSnapshot = await this.firebaseApp
                .firestore()
                .collection("users")
                .count()
                .get();
            const totalUsers = usersSnapshot.data().count;
            const activeSubsSnapshot = await this.firebaseApp
                .firestore()
                .collection("users")
                .where("subscriptionTier", "in", ["quiz", "pro"])
                .count()
                .get();
            const activeSubs = activeSubsSnapshot.data().count;
            const statsDoc = await this.firebaseApp
                .firestore()
                .collection("system")
                .doc("usage")
                .get();
            const featureUsage = statsDoc.exists
                ? statsDoc.data()
                : {
                    interviews: 0,
                    resumes: 0,
                    flashcards: 0,
                    quizzes: 0,
                    summaries: 0,
                    codeTests: 0,
                };
            return {
                totalUsers,
                activeSubs,
                systemStatus: "Healthy",
                featureUsage,
            };
        }
        catch (error) {
            this.logger.error("Failed to fetch stats", error);
            return {
                totalUsers: 0,
                activeSubs: 0,
                systemStatus: "Degraded",
                featureUsage: {
                    interviews: 0,
                    resumes: 0,
                    flashcards: 0,
                    quizzes: 0,
                    summaries: 0,
                    codeTests: 0,
                },
            };
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("FIREBASE_APP")),
    __metadata("design:paramtypes", [Object])
], AdminService);
//# sourceMappingURL=admin.service.js.map