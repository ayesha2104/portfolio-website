import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data/portfolio';

const Skills: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section id="skills" className="section relative z-10">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Section Title */}
                    <motion.h2 variants={itemVariants} className="section-title text-center">
                        Ability Tree
                    </motion.h2>

                    {/* Skills by Category */}
                    <div className="max-w-6xl mx-auto space-y-12">
                        {portfolioData.skills.map((category, catIndex) => (
                            <motion.div
                                key={category.category}
                                variants={itemVariants}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-display font-bold text-primary-400 flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500"></span>
                                    {category.category}
                                </h3>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.items.map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="card group relative overflow-hidden"
                                        >
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-300"></div>

                                            <div className="relative flex items-center gap-4">
                                                {/* Icon */}
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600/20 to-accent-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    {skill.icon ? (
                                                        <skill.icon className="w-6 h-6 text-primary-400" />
                                                    ) : (
                                                        <span className="text-xl">⚡</span>
                                                    )}
                                                </div>

                                                {/* Skill Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-semibold text-dark-100">
                                                            {skill.name}
                                                        </h4>
                                                        <span className="text-sm font-bold text-accent-400">
                                                            {skill.proficiency}%
                                                        </span>
                                                    </div>

                                                    {/* Proficiency Bar */}
                                                    <div className="progress-bar">
                                                        <motion.div
                                                            className="progress-fill"
                                                            initial={{ width: 0 }}
                                                            animate={inView ? { width: `${skill.proficiency}%` } : {}}
                                                            transition={{
                                                                duration: 1,
                                                                delay: 0.5 + catIndex * 0.2 + index * 0.1,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* XP Points */}
                                            <div className="absolute top-2 right-2 text-xs text-dark-500 font-mono">
                                                {skill.proficiency * 100} XP
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
