import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { InteractiveLegalPage, Section } from '@/components/legal/InteractiveLegalPage';

export const metadata: Metadata = {
    title: 'Privacy Policy - Proba',
    description: 'Understand how Proba collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    const sections: Section[] = [
        {
            id: 'collection',
            title: 'Information Collection',
            content: (
                <>
                    <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                    <h3 className="text-xl font-bold mt-4 mb-2">Types of Data Collected</h3>
                    <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Email Address:</strong> To communicate with you regarding your account and updates.</li>
                        <li><strong>First and Last Name:</strong> To personalize your experience.</li>
                        <li><strong>Cookies and Usage Data:</strong> To track the activity on our Service and hold certain information.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'use',
            title: 'Use of Data',
            content: (
                <>
                    <p>Proba uses the collected data for various purposes:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li>To provide and maintain the Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To provide customer care and support</li>
                        <li>To provide analysis or valuable information so that we can improve the Service</li>
                        <li>To contact you with newsletters, marketing or promotional materials</li>
                    </ul>
                </>
            )
        },
        {
            id: 'security',
            title: 'Security of Data',
            content: "The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security."
        },
        {
            id: 'changes',
            title: 'Changes to Policy',
            content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes."
        }
    ];

    return (
        <LegalLayout>
            <InteractiveLegalPage
                title="Privacy Policy"
                updatedAt={new Date().toISOString()}
                introduction="Proba ('us', 'we', or 'our') operates the Proba.ai website (the 'Service'). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data."
                sections={sections}
                icon="shield"
            />
        </LegalLayout>
    );
}
