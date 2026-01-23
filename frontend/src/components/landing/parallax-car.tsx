'use client';

import React, { useState, useEffect, useRef } from 'react';

export const ParallaxCar: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress based on when the section is in view
            // Progress 0 when bottom of section enters, 1 when top of section leaves
            const sectionHeight = rect.height;
            const progress = 1 - (rect.bottom / (windowHeight + sectionHeight));

            setScrollProgress(Math.max(0, Math.min(1, progress)));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Multi-layer mapping
    const bgTranslateY = scrollProgress * 200; // Background moves down
    const textTranslateY = scrollProgress * -150; // Text moves up
    const textOpacity = 1 - Math.abs(scrollProgress - 0.5) * 2; // Fade in/out at center

    // Foreground (Car) Zoom effect
    // Starts at 0.8 scale, zooms to 2.5
    const carScale = 0.8 + scrollProgress * 1.7;
    const carRotate = scrollProgress * 10 - 5; // Slight rotation -5 to +5
    const carOpacity = scrollProgress < 0.1 ? scrollProgress * 10 : 1; // Quick fade in

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[120vh] bg-slate-950 overflow-hidden flex items-center justify-center border-y border-slate-900"
            style={{ perspective: '1000px' }}
        >
            {/* Background Layer - Subtle Grid or Depth */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, #1e293b 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: `translate3d(0, ${bgTranslateY}px, -100px) scale(1.5)`,
                }}
            />

            {/* Middle Layer - Content/Text */}
            <div
                className="relative z-10 text-center pointer-events-none transition-opacity duration-300"
                style={{
                    transform: `translate3d(0, ${textTranslateY}px, 0)`,
                    opacity: textOpacity,
                }}
            >
                <span className="text-slate-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
                    Experiência Premium
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
                    MAGNO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">RENT CARS</span>
                </h2>
            </div>

            {/* Foreground Layer - The Car */}
            <div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                style={{
                    transform: `scale(${carScale}) rotate(${carRotate}deg) translate3d(0, 0, 100px)`,
                    transition: 'transform 0.1s ease-out',
                    opacity: carOpacity,
                }}
            >
                <img
                    src="/assets/parallax-car.png"
                    alt="Premium Car"
                    className="w-full max-w-5xl px-4 object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.8)]"
                />
            </div>

            {/* Overlays for Depth */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-950 to-transparent z-30" />
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 to-transparent z-30" />

            {/* Scroll Indicator Dot */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
                <div className="w-1 h-12 rounded-full bg-slate-900 overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 w-full bg-white transition-all duration-100"
                        style={{ height: `${scrollProgress * 100}%` }}
                    />
                </div>
            </div>
        </section>
    );
};
