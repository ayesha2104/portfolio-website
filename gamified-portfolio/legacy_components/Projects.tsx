import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiExternalLink, HiCode, HiServer, HiDatabase } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';

const Projects: React.FC = () => {
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    // Icons for visual flair based on project index
    const projectIcons = [HiServer, HiDatabase, HiCode];

    return (
        <section id="projects" className="section relative z-10 py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <motion.h2 variants={itemVariants} className="section-title inline-block">
                            Engineered Solutions
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-dark-300 mt-4 max-w-2xl mx-auto text-lg">
                            A showcase of scalable systems, distributed architectures, and complex backend solutions.
                        </motion.p>
                    </div>

                    {/* Statically Mapped Detailed Projects */}
                    <div className="space-y-24">
                        {portfolioData.projects.map((project, index) => {
                            const Icon = projectIcons[index % projectIcons.length];
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={project.title}
                                    variants={itemVariants}
                                    className={`relative grid lg:grid-cols-12 gap-12 items-center ${!isEven ? 'lg:text-right' : ''
                                        }`}
                                >
                                    {/* Project Content */}
                                    <div className={`lg:col-span-12 relative z-10 p-8 rounded-2xl glass-dark border border-white/5 backdrop-blur-xl hover:border-primary-500/30 transition-colors duration-500 group`}>

                                        {/* Status Tag */}
                                        <div className={`flex items-center gap-2 mb-4 ${!isEven ? 'lg:justify-end' : ''}`}>
                                            <Icon className="text-primary-500 w-5 h-5" />
                                            <span className={`inline-block w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`}></span>
                                            <span className="text-xs font-mono uppercase tracking-wider text-dark-400">
                                                {project.status}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className={`text-accent-500 font-mono text-sm mb-6`}>
                                            {project.role}
                                        </div>

                                        <p className="text-dark-200 leading-relaxed text-lg mb-8 max-w-4xl">
                                            {project.description}
                                        </p>

                                        {/* Key Features Grid */}
                                        {project.features && (
                                            <div className={`grid md:grid-cols-2 gap-4 mb-8 ${!isEven ? 'lg:justify-items-end' : ''}`}>
                                                {project.features.map((feature, i) => (
                                                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 ${!isEven ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
                                                        <div className="text-primary-500 mt-1">
                                                            <HiCode />
                                                        </div>
                                                        <span className="text-sm text-dark-300">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Tech Stack */}
                                        <div className={`flex flex-wrap gap-3 mb-8 ${!isEven ? 'lg:justify-end' : ''}`}>
                                            {project.techStack.map(tech => (
                                                <span key={tech} className="px-3 py-1 text-sm font-medium text-primary-300 bg-primary-900/20 border border-primary-500/20 rounded-full">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className={`flex gap-6 ${!isEven ? 'lg:justify-end' : ''}`}>
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
                                                >
                                                    <FaGithub className="text-xl" />
                                                    <span className="font-medium">Source Code</span>
                                                </a>
                                            )}
                                            {project.link && project.link !== '#' && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-accent-500 hover:text-accent-400 transition-colors"
                                                >
                                                    <HiExternalLink className="text-xl" />
                                                    <span className="font-medium">Live Demo</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
