import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { initiateSocialSignIn } from '@/firebase/non-blocking-login';
import { cn } from '@/lib/utils';

interface SocialLoginButtonsProps {
    className?: string;
}

export const SocialLoginButtons = React.memo(({ className }: SocialLoginButtonsProps) => {
    const { toast } = useToast();
    const auth = useAuth();
    const firestore = useFirestore();

    /**
   * Handles social login flow.
   * 
   * IMPORTANT: To avoid "auth/operation-not-allowed" errors:
   * 1. Go to Firebase Console > Authentication > Sign-in method.
   * 2. Enable Google, Microsoft, and GitHub providers.
   * 3. For Microsoft/GitHub, ensure Client ID/Secret are properly configured in the console.
   */
    const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'github') => {
        try {
            await initiateSocialSignIn(auth, firestore, provider);
            toast({
                title: 'Authentication Successful',
                description: `Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}. Redirecting...`,
            });
        } catch (error: any) {
            console.error(error);
            let msg = 'Failed to sign in.';
            if (error.code === 'auth/account-exists-with-different-credential') {
                msg = 'An account already exists with the same email address but different sign-in credentials.';
            }
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: msg,
            });
        }
    };

    return (
        <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-3", className)}>
            <Button
                variant="outline"
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full bg-white hover:bg-gray-50 text-black border-gray-200 shadow-sm relative overflow-hidden group"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                {/* Google Icon */}
                <svg className="h-5 w-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                <span className="sm:hidden">Google</span>
            </Button>

            <Button
                variant="outline"
                type="button"
                onClick={() => handleSocialLogin('microsoft')}
                className="w-full bg-[#2F2F2F] hover:bg-[#1a1a1a] text-white border-transparent shadow-sm relative overflow-hidden group"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                {/* Microsoft Icon */}
                <svg className="h-5 w-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="microsoft" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                    <path fill="#F25022" d="M1 1h10v10H1z" />
                    <path fill="#00A4EF" d="M1 12h10v10H1z" />
                    <path fill="#7FBA00" d="M12 1h10v10H12z" />
                    <path fill="#FFB900" d="M12 12h10v10H12z" />
                </svg>
                <span className="sm:hidden">Microsoft</span>
            </Button>

            <Button
                variant="outline"
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="w-full bg-[#24292e] hover:bg-[#1b1f23] text-white border-transparent shadow-sm relative overflow-hidden group"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                {/* GitHub Icon */}
                <svg className="h-5 w-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-63.5 0-14 5-25.5 13.2-34.5-1.3-3.5-5.7-16.2 1.2-34 0 0 10.7-3.6 35.1 13.1 10.1-2.9 21-4.3 32-4.3 11 0 21.9 1.4 32 4.3 24.4-16.8 35.1-13.1 35.1-13.1 6.8 17.9 2.4 30.6 1.2 34.1 8.3 8.9 13.2 20.5 13.2 34.5 0 49.4-56.4 57.2-112.3 63.5 9.1 7.9 17.3 23.5 17.3 47.6 0 34.2-.3 61.7-.3 70.3 0 6.7 4.5 14.6 17.5 12.1C426.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                <span className="sm:hidden">GitHub</span>
            </Button>
        </div>
    );
});
