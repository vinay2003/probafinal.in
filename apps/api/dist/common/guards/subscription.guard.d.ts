import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class SubscriptionGuard implements CanActivate {
    private firebaseApp;
    constructor(firebaseApp: admin.app.App);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
