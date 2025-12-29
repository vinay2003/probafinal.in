import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { InteractiveLegalPage, Section } from '@/components/legal/InteractiveLegalPage';

export const metadata: Metadata = {
    title: 'Disclaimer - Proba',
    description: 'Legal disclaimer regarding the use of Proba’s AI-powered services.',
};

export default function DisclaimerPage() {
    const sections: Section[] = [
        {
            id: 'general',
            title: 'General Information',
            content: "The information provided by Proba ('we,' 'us,' or 'our') on our website and mobile application is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information."
        },
        {
            id: 'ai-disclaimer',
            title: 'AI-Generated Content Disclaimer',
            content: (
                <>
                    <p>Our Service utilizes Artificial Intelligence (AI) to generate interview questions, answers, feedback, and study materials. While we strive for high accuracy, AI technology has inherent limitations:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Hallucinations:</strong> AI may occasionally generate incorrect or misleading information.</li>
                        <li><strong>Context:</strong> AI may not fully grasp the specific nuances of your personal situation.</li>
                        <li><strong>Verification:</strong> AI content should be verified independently, especially for critical facts or data.</li>
                    </ul>
                    <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-600 dark:text-yellow-400 text-sm">
                        <span className="font-bold">Important:</span> Do not rely solely on AI-generated advice for critical career decisions.
                    </div>
                </>
            )
        },
        {
            id: 'external-links',
            title: 'External Links Disclaimer',
            content: "The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services."
        },
        {
            id: 'professional',
            title: 'Professional Advice Disclaimer',
            content: "The Site cannot and does not contain legal or career counseling advice. The educational and interview preparation information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals."
        }
    ];

    return (
        <LegalLayout>
            <InteractiveLegalPage
                title="Disclaimer"
                updatedAt={new Date().toISOString()}
                introduction="Please read this disclaimer carefully before using the Proba application or website."
                sections={sections}
                icon="alert"
            />
        </LegalLayout>
    );
}
