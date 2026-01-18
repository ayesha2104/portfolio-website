import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { portfolioData } from '../data/portfolio';

const Hero: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = portfolioData.personal.role;

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section id="home" className="section relative z-10 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full text-sm font-medium text-primary-300">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Available for opportunities
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-6"
                    >
                        <span className="glow-text text-shadow-lg">
                            {portfolioData.personal.name}
                        </span>
                    </motion.h1>

                    {/* Tagline with typewriter effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-8 h-12"
                    >
                        <p className="text-2xl md:text-3xl lg:text-4xl text-dark-300 font-medium">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="flex flex-col sm:flex-row gap-4 mb-12"
                    >
                        <a href="#projects" className="btn-primary group">
                            <span className="flex items-center gap-2">
                                Start Quest
                                <HiSparkles className="group-hover:rotate-12 transition-transform" />
                            </span>
                        </a>
                        <a href="#contact" className="btn-secondary">
                            Contact Me
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        className="flex gap-6"
                    >
                        {portfolioData.personal.links.github && (
                            <a
                                href={portfolioData.personal.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark-400 hover:text-primary-500 transition-colors transform hover:scale-110"
                            >
                                <FaGithub className="w-8 h-8" />
                            </a>
                        )}
                        {portfolioData.personal.links.linkedin && (
                            <a
                                href={portfolioData.personal.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark-400 hover:text-primary-500 transition-colors transform hover:scale-110"
                            >
                                <FaLinkedin className="w-8 h-8" />
                            </a>
                        )}
                        {portfolioData.personal.email && (
                            <a
                                href={`mailto:${portfolioData.personal.email}`}
                                className="text-dark-400 hover:text-primary-500 transition-colors transform hover:scale-110"
                            >
                                <FaEnvelope className="w-8 h-8" />
                            </a>
                        )}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 2 }}
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-xs text-dark-500 uppercase tracking-wider">Scroll to explore</span>
                            <div className="w-6 h-10 border-2 border-dark-600 rounded-full flex justify-center pt-2">
                                <div className="w-1 h-3 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
