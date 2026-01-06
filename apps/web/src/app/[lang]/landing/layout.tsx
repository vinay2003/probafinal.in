import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <SmoothScroll>{children}</SmoothScroll>;
}
