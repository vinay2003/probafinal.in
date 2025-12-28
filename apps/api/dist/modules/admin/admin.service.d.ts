import * as admin from 'firebase-admin';
export declare class AdminService {
    private firebaseApp;
    private readonly logger;
    constructor(firebaseApp: admin.app.App);
    getUsers(): Promise<{
        id: string;
        name: any;
        email: any;
        plan: any;
        status: string;
        date: string;
    }[]>;
    getUser(id: string): Promise<{
        id: string;
        name: any;
        email: any;
        plan: any;
        status: string;
        date: string;
    }>;
    getPlans(): Promise<{
        name: string;
        price: string;
        currency: string;
        description: string;
        features: string[];
        active: boolean;
    }[] | {
        id: string;
    }[]>;
    private fallbackPlans;
    createPlan(plan: any): Promise<any>;
    getStats(): Promise<{
        totalUsers: number;
        activeSubs: number;
        systemStatus?: undefined;
        featureUsage?: undefined;
    } | {
        totalUsers: number;
        activeSubs: number;
        systemStatus: string;
        featureUsage: admin.firestore.DocumentData;
    }>;
}
