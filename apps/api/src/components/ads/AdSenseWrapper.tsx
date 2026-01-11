'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSubscription } from '@/hooks/use-subscription';

export function AdSenseWrapper({ children }: { children: React.ReactNode }) {
    const { isPro } = useSubscription();

    if (isPro) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* Top Ad Banner */}
                <div className="w-full bg-gray-100 text-center py-2 text-xs text-gray-500">
                    SPONSORED
                    <div className="google-ad-placeholder h-[90px] w-full bg-gray-200 flex items-center justify-center">
                        AdSense Banner Here
                    </div>
                </div>

                <div className="flex-1">
                    {children}
                </div>

                {/* Bottom Ad Banner */}
                <div className="w-full bg-gray-100 text-center py-2 text-xs text-gray-500">
                    SPONSORED
                    <div className="google-ad-placeholder h-[90px] w-full bg-gray-200 flex items-center justify-center">
                        AdSense Banner Here
                    </div>
                </div>
            </div>

            {/* Actual AdSense Script - Replace CA-PUB-XXX with real ID */}
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </>
    );
}
