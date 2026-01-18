import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { portfolioData } from '../src/data/portfolio';

const Experience: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [expandedId, setExpandedId] = useState<number | null>(null);

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
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="experience" className="section relative z-10">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Section Title */}
                    <motion.h2 variants={itemVariants} className="section-title text-center">
                        Journey Log
                    </motion.h2>

                    {/* Timeline */}
                    <div className="max-w-4xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500"></div>

                        {/* Experience Items */}
                        <div className="space-y-12">
                            {portfolioData.experience.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 ring-4 ring-dark-950 z-10"></div>

                                    {/* Spacer for desktop */}
                                    <div className="hidden md:block flex-1"></div>

                                    {/* Content Card */}
                                    <div className="flex-1 ml-16 md:ml-0">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="card cursor-pointer"
                                            onClick={() => setExpandedId(expandedId === index ? null : index)}
                                        >
                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                {/* Company Logo / Placeholder */}
                                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-600/20 flex items-center justify-center text-3xl flex-shrink-0">
                                                    🏢
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-display font-bold text-dark-100 mb-1">
                                                        {exp.role}
                                                    </h3>
                                                    <div className="text-primary-400 font-semibold mb-1">
                                                        {exp.company}
                                                    </div>
                                                    <div className="text-sm text-dark-500 flex items-center gap-2">
                                                        <span>📅</span>
                                                        {exp.duration}
                                                    </div>
                                                    <div className="text-sm text-dark-500 flex items-center gap-2">
                                                        <span>📍</span>
                                                        {exp.location}
                                                    </div>
                                                </div>

                                                {/* Expand Icon */}
                                                <button className="text-dark-400 hover:text-primary-400 transition-colors">
                                                    {expandedId === index ? (
                                                        <HiChevronUp className="w-6 h-6" />
                                                    ) : (
                                                        <HiChevronDown className="w-6 h-6" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Responsibilities (Expandable) */}
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: expandedId === index ? 'auto' : 0,
                                                    opacity: expandedId === index ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 border-t border-dark-700">
                                                    <h4 className="text-sm font-semibold text-dark-300 mb-3">
                                                        Quest Achievements:
                                                    </h4>
                                                    <ul className="space-y-2 mb-4">
                                                        {exp.responsibilities.map((achievement, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                                                                <span className="text-accent-500 mt-0.5">⚔️</span>
                                                                {achievement}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.techStack.map(tech => (
                                                            <span key={tech} className="badge text-xs">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Preview (when collapsed) */}
                                            {expandedId !== index && (
                                                <div className="text-sm text-dark-400 line-clamp-2">
                                                    {exp.responsibilities[0]}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
