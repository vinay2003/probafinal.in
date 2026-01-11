import { i18n } from '@/i18n-config';

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
    return children;
}
