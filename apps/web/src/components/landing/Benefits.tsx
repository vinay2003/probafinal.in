'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 95, suffix: "%", label: "Success Rate" },
    { value: 50, suffix: "k+", label: "Active Users" },
    { value: 100, suffix: "+", label: "Exams Covered" },
    { value: 24, suffix: "/7", label: "AI Availability" },
];

export function Benefits() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Select all elements with class 'stat-value'
        const items = gsap.utils.toArray('.stat-value');

        items.forEach((item: any) => {
            const targetValue = parseInt(item.getAttribute('data-value'));

            gsap.fromTo(item,
                { innerText: 0 },
                {
                    innerText: targetValue,
                    duration: 2,
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 80%',
                    },
                    snap: { innerText: 1 }, // Snap to whole numbers
                    ease: "power2.out",
                    onUpdate: function () {
                        item.innerHTML = Math.ceil(this.targets()[0].innerText);
                    }
                }
            );
        });

    }, { scope: container });

    return (
        <section ref={container} className="py-20 bg-primary/5 border-y border-border/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="flex items-baseline text-4xl md:text-6xl font-black text-primary tracking-tighter">
                                <span className="stat-value" data-value={stat.value}>0</span>
                                <span>{stat.suffix}</span>
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
