import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressTracker: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

    const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];

    useEffect(() => {
        const handleScroll = () => {
            // Track visited sections
            const newVisitedSections = new Set(visitedSections);

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        newVisitedSections.add(section);
                    }
                }
            });

            setVisitedSections(newVisitedSections);

            // Calculate progress
            const progressPercentage = (newVisitedSections.size / sections.length) * 100;
            setProgress(progressPercentage);

            // Save to localStorage
            localStorage.setItem('portfolioProgress', JSON.stringify(Array.from(newVisitedSections)));
        };

        // Load from localStorage
        const saved = localStorage.getItem('portfolioProgress');
        if (saved) {
            setVisitedSections(new Set(JSON.parse(saved)));
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visitedSections]);

    return (
        <div className="fixed top-20 right-4 z-40 glass-dark rounded-lg p-4 hidden lg:block">
            <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-dark-400 font-medium">Quest Progress</div>
                <div className="relative w-16 h-16">
                    <svg className="transform -rotate-90" width="64" height="64">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-dark-800"
                        />
                        <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - progress / 100) }}
                            transition={{ duration: 0.5 }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold glow-text">{Math.round(progress)}%</span>
                    </div>
                </div>
                <div className="text-xs text-dark-500">
                    {visitedSections.size}/{sections.length} explored
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;
