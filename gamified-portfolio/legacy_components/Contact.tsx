import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDownload, HiClipboardCopy, HiCheck } from 'react-icons/hi';
import { portfolioData } from '../data/portfolio';

const Contact: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [copied, setCopied] = useState(false);

    const email = portfolioData.personal.email;

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="contact" className="section relative z-10 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="max-w-4xl mx-auto"
                >
                    {/* Section Title */}
                    <motion.h2 variants={itemVariants} className="section-title text-center">
                        Guild Recruitment
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-center text-dark-300 text-lg mb-12 max-w-2xl mx-auto"
                    >
                        Ready to embark on an epic quest together? Let's connect and build something amazing!
                    </motion.p>

                    {/* Main Contact Card */}
                    <motion.div variants={itemVariants} className="card mb-8">
                        <div className="text-center">
                            <div className="text-6xl mb-6">📬</div>

                            {/* Email with Copy */}
                            <div className="mb-6">
                                <div className="text-sm text-dark-400 mb-2">Send a Message</div>
                                <div className="flex items-center justify-center gap-3">
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-2xl font-semibold glow-text hover:scale-105 transition-transform"
                                    >
                                        {email}
                                    </a>
                                    <button
                                        onClick={copyEmail}
                                        className="p-2 rounded-lg glass-dark hover:bg-dark-700 transition-colors"
                                        title="Copy email"
                                    >
                                        {copied ? (
                                            <HiCheck className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <HiClipboardCopy className="w-5 h-5 text-dark-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Download Resume (Optional) */}
                            <motion.a
                                href="/resume.pdf" // Placeholder, user can update this path
                                download
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <HiDownload className="w-5 h-5" />
                                Download Character Sheet
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-12">
                        {portfolioData.personal.links.github && (
                            <motion.a
                                href={portfolioData.personal.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="card text-center group hover:bg-dark-700 transition-colors"
                            >
                                <FaGithub className="w-8 h-8 mx-auto mb-2 text-white" />
                                <div className="text-sm font-medium text-dark-300">GitHub</div>
                            </motion.a>
                        )}
                        {portfolioData.personal.links.linkedin && (
                            <motion.a
                                href={portfolioData.personal.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="card text-center group hover:bg-blue-900/20 transition-colors"
                            >
                                <FaLinkedin className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                <div className="text-sm font-medium text-dark-300">LinkedIn</div>
                            </motion.a>
                        )}
                        {/* Add more checks if other links exist */}
                    </motion.div>



                    {/* Footer */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mt-16 text-dark-500 text-sm"
                    >
                        <p>Built with ⚡ React, TypeScript & Tailwind CSS</p>
                        <p className="mt-2">© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
