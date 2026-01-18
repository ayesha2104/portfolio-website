import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data/portfolio';

const About: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="about" className="section relative z-10">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Section Title */}
                    <motion.h2 variants={itemVariants} className="section-title text-center">
                        Character Profile
                    </motion.h2>

                    <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        {/* Avatar/Image Placeholder (Optional, keeping structure) */}
                        <motion.div variants={itemVariants} className="flex justify-center lg:sticky lg:top-24">
                            <div className="relative group w-full max-w-md">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative glass-dark rounded-2xl p-8 flex flex-col items-center text-center">
                                    <div className="w-40 h-40 bg-gradient-to-br from-dark-800 to-dark-900 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/10">
                                        <span className="text-6xl">👩‍💻</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">{portfolioData.personal.name}</h3>
                                    <p className="text-primary-400 font-mono mb-6">{portfolioData.personal.role}</p>

                                    {/* Quick Info */}
                                    <div className="w-full grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-dark-800/50 rounded-lg">
                                            <div className="text-xs text-dark-400 uppercase tracking-wider mb-1">Location</div>
                                            <div className="font-medium text-dark-200">{portfolioData.personal.location}</div>
                                        </div>
                                        <div className="p-3 bg-dark-800/50 rounded-lg">
                                            <div className="text-xs text-dark-400 uppercase tracking-wider mb-1">Level</div>
                                            <div className="font-medium text-accent-400 font-display">Lvl {portfolioData.personal.level}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bio & Details */}
                        <motion.div variants={itemVariants} className="space-y-8">
                            {/* Origin Story */}
                            <div className="card">
                                <h3 className="text-2xl font-display font-bold glow-text mb-4">
                                    Origin Story
                                </h3>
                                <p className="text-dark-300 leading-relaxed text-lg">
                                    {portfolioData.personal.bio}
                                </p>
                            </div>

                            {/* Character Attributes (Stats) */}
                            <div className="card">
                                <h3 className="text-xl font-display font-bold glow-text mb-6">
                                    Character Attributes
                                </h3>
                                <div className="space-y-6">
                                    {portfolioData.personal.stats.map((stat, index) => (
                                        <div key={stat.label}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    {stat.icon && <stat.icon className="w-5 h-5 text-accent-500" />}
                                                    <div>
                                                        <span className="text-sm font-medium text-dark-200 block">
                                                            {stat.label}
                                                        </span>
                                                        <span className="text-xs text-dark-400 hidden sm:block">
                                                            {stat.description}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-bold text-primary-400 font-mono">
                                                    {stat.value}%
                                                </span>
                                            </div>
                                            <div className="progress-bar">
                                                <motion.div
                                                    className="progress-fill"
                                                    initial={{ width: 0 }}
                                                    animate={inView ? { width: `${stat.value}%` } : {}}
                                                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Education Quest Log */}
                            <div className="card">
                                <h3 className="text-xl font-display font-bold glow-text mb-4">
                                    Education Quest
                                </h3>
                                <div className="space-y-6">
                                    {portfolioData.education.map((edu, index) => (
                                        <div key={index} className="relative pl-6 border-l-2 border-dark-700">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-900 border-2 border-primary-500"></div>
                                            <h4 className="text-lg font-bold text-white">{edu.institution}</h4>
                                            <p className="text-primary-400 text-sm mb-1">{edu.degree}</p>
                                            <div className="flex justify-between text-xs text-dark-400 mb-2">
                                                <span>{edu.duration}</span>
                                                <span className="text-accent-400 font-bold">CGPA: {edu.cgpa}</span>
                                            </div>
                                            <p className="text-dark-300 text-sm italic">
                                                {edu.coursework}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="card">
                                <h3 className="text-xl font-display font-bold glow-text mb-4">
                                    Achievements Unlocked
                                </h3>
                                <ul className="space-y-3">
                                    {portfolioData.achievements.map((achievement, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-accent-500 mt-1">🏆</span>
                                            <span className="text-dark-300">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
