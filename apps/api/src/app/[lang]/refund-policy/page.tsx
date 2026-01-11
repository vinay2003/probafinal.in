import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { InteractiveLegalPage, Section } from '@/components/legal/InteractiveLegalPage';

export const metadata: Metadata = {
    title: 'Refund Policy - Proba',
    description: 'Learn about our refund eligibility and processes at Proba.',
};

export default function RefundPolicyPage() {
    const sections: Section[] = [
        {
            id: 'eligibility',
            title: 'Eligibility for Refunds',
            content: "We offer a 7-day money-back guarantee for first-time subscribers. If you are unsatisfied with our service for any reason within the first 7 days of your initial subscription, you may request a full refund. This applies only to your first purchase."
        },
        {
            id: 'non-refundable',
            title: 'Non-refundable Items',
            content: (
                <ul className="list-disc pl-6 space-y-2">
                    <li>Renewal payments (except where required by applicable law).</li>
                    <li>One-time specialized coaching sessions that have already been conducted.</li>
                    <li>Downloadable digital products that have been accessed.</li>
                </ul>
            )
        },
        {
            id: 'processing',
            title: 'Processing Refunds',
            content: (
                <>
                    <p>Once your refund request is received and inspected:</p>
                    <ol className="list-decimal pl-6 space-y-2 mt-4">
                        <li>We will send you an email to notify you of the approval or rejection of your refund.</li>
                        <li>If approved, your refund will be processed immediately.</li>
                        <li>A credit will automatically be applied to your credit card or original method of payment within 5-10 business days.</li>
                    </ol>
                </>
            )
        },
        {
            id: 'late-refunds',
            title: 'Late or Missing Refunds',
            content: "If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted."
        }
    ];

    return (
        <LegalLayout>
            <InteractiveLegalPage
                title="Refund Policy"
                updatedAt={new Date().toISOString()}
                introduction="At Proba, we strive to provide the best AI interview preparation experience. If you are not entirely satisfied with your purchase, we're here to help."
                sections={sections}
                icon="file"
            />
        </LegalLayout>
    );
}
