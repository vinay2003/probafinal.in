import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { InteractiveLegalPage, Section } from '@/components/legal/InteractiveLegalPage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Return Policy - Proba',
    description: 'Read our return policy to understand your rights regarding product returns.',
};

export default function ReturnPolicyPage() {
    const sections: Section[] = [
        {
            id: 'digital-returns',
            title: 'Returns for Digital Services',
            content: "As Proba primarily offers digital services (SaaS) and subscriptions, traditional 'returns' of physical goods do not typically apply. Once a subscription period has commenced and the service has been accessed, the 'time' used cannot be returned."
        },
        {
            id: 'cancellations',
            title: 'Subscription Cancellations',
            content: (
                <>
                    <p>You may cancel your subscription at any time via your account settings dashboard.</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Effect:</strong> Your cancellation will take effect at the end of the current billing cycle.</li>
                        <li><strong>Access:</strong> You will retain full access to Proba Pro features until that date.</li>
                        <li><strong>Auto-renewal:</strong> Cancellation ensures you won't be charged for the next cycle.</li>
                    </ul>
                </>
            )
        },
        {
            id: 'exceptions',
            title: 'Exceptions',
            content: "In cases of technical failure where the service was completely inaccessible for a significant duration (more than 24 hours), we may offer a pro-rata extension of your subscription or a partial refund at our discretion."
        },
        {
            id: 'contact',
            title: 'Contact Us',
            content: (
                <div className="bg-muted p-4 rounded-lg">
                    <p className="mb-2">If you have any questions about our Returns and Cancellations Policy, please contact us:</p>
                    <ul className="list-none space-y-1">
                        <li><strong>Email:</strong> support@proba.in</li>
                        <li><strong>Web:</strong> <Link href="/contact-us" className="text-primary underline">Contact Support Page</Link></li>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <LegalLayout>
            <InteractiveLegalPage
                title="Return Policy"
                updatedAt={new Date().toISOString()}
                introduction="Thank you for choosing Proba. We are committed to ensuring your satisfaction with our AI-powered learning tools. This policy outlines how returns apply to our digital services."
                sections={sections}
                icon="file"
            />
        </LegalLayout>
    );
}
