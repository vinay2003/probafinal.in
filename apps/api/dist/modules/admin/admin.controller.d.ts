import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
        featureUsage: FirebaseFirestore.DocumentData;
    }>;
}
