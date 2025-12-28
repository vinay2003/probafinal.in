import { Injectable, Inject, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AdminService {
    private readonly logger = new Logger(AdminService.name);

    constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) { }

    async getUsers() {
        if (!this.firebaseApp) return [];
        try {
            const snapshot = await this.firebaseApp.firestore().collection('users').get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.displayName || data.email || "Unknown User",
                    email: data.email || "No Email",
                    plan: data.subscriptionTier ? (data.subscriptionTier.charAt(0).toUpperCase() + data.subscriptionTier.slice(1)) : "Free",
                    status: "Active",
                    date: data.createdAt ? new Date(data.createdAt.toDate ? data.createdAt.toDate() : data.createdAt).toISOString().split('T')[0] : "N/A"
                };
            });
        } catch (error) {
            this.logger.error("Failed to fetch users from Firestore", error);
            // Fallback for demo/dev without creds: Return existing fallback data or empty
            return [];
        }
    }

    async getUser(id: string) {
        if (!this.firebaseApp) return null;
        const doc = await this.firebaseApp.firestore().collection('users').doc(id).get();
        if (!doc.exists) return null;
        const data = doc.data();
        return {
            id: doc.id,
            name: data.displayName || data.email || "Unknown User",
            email: data.email || "No Email",
            plan: data.subscriptionTier || "Free",
            status: "Active",
            date: data.createdAt ? new Date(data.createdAt.toDate()).toISOString().split('T')[0] : "N/A"
        };
    }

    async getPlans() {
        if (!this.firebaseApp) return [];
        try {
            const snapshot = await this.firebaseApp.firestore().collection('plans').get();
            if (snapshot.empty) return this.fallbackPlans;
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            this.logger.error("Failed to fetch plans", error);
            return this.fallbackPlans;
        }
    }

    // Fallback data for when DB is empty/unreachable
    private fallbackPlans = [
        {
            name: "Quiz Access",
            price: "49",
            currency: "₹",
            description: "Perfect for exam prep.",
            features: ['Unlimited AI-powered quiz generation', 'AI feedback on your answers'],
            active: true
        },
        {
            name: "Pro Access",
            price: "119",
            currency: "₹",
            description: "The ultimate AI study companion.",
            features: [
                'Unlimited AI-powered quiz generation',
                'AI Mock Interview practice',
                'ATS Resume Optimizer',
                'Document Summarizer'
            ],
            active: true
        }
    ];

    async createPlan(plan: any) {
        if (!this.firebaseApp) throw new Error("Firebase not initialized");
        try {
            const id = plan.name.toLowerCase().replace(/\s+/g, '-');
            const newPlan = { ...plan, id, active: true };
            await this.firebaseApp.firestore().collection('plans').doc(id).set(newPlan);
            return newPlan;
        } catch (error) {
            this.logger.error("Failed to create plan", error);
            throw error;
        }
    }

    async getStats() {
        if (!this.firebaseApp) return { totalUsers: 0, activeSubs: 0 };
        try {
            const usersSnapshot = await this.firebaseApp.firestore().collection('users').count().get();
            const totalUsers = usersSnapshot.data().count;

            const activeSubsSnapshot = await this.firebaseApp.firestore().collection('users')
                .where('subscriptionTier', 'in', ['quiz', 'pro'])
                .count().get();
            const activeSubs = activeSubsSnapshot.data().count;

            const statsDoc = await this.firebaseApp.firestore().collection('system').doc('usage').get();
            const featureUsage = statsDoc.exists ? statsDoc.data() : {
                interviews: 0, resumes: 0, flashcards: 0, quizzes: 0, summaries: 0, codeTests: 0
            };

            return {
                totalUsers,
                activeSubs,
                systemStatus: 'Healthy',
                featureUsage
            };
        } catch (error) {
            this.logger.error("Failed to fetch stats", error);
            return {
                totalUsers: 0,
                activeSubs: 0,
                systemStatus: 'Degraded',
                featureUsage: { interviews: 0, resumes: 0, flashcards: 0, quizzes: 0, summaries: 0, codeTests: 0 }
            };
        }
    }
}
