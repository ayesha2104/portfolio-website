import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { portfolioData } from '../../data/portfolio';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { HiLockClosed, HiLockOpen, HiCheckCircle } from 'react-icons/hi';
import confetti from 'canvas-confetti';

const ContactBoss: React.FC = () => {
    const { completeAction, gameState, resetGame } = useGame();
    const [unlockedChannels, setUnlockedChannels] = useState<string[]>(
        gameState.completedActions.filter(a => a.startsWith('contact_')).map(a => a.replace('contact_', ''))
    );

    const channels = [
        { id: 'github', icon: FaGithub, link: portfolioData.personal.links.github, label: 'GITHUB' },
        { id: 'linkedin', icon: FaLinkedin, link: portfolioData.personal.links.linkedin, label: 'LINKEDIN' },
        { id: 'email', icon: FaEnvelope, link: `mailto:${portfolioData.personal.email}`, label: 'EMAIL' },
        { id: 'leetcode', icon: HiCode, link: portfolioData.personal.links.leetcode, label: 'LEETCODE' }
    ];

    const allUnlocked = unlockedChannels.length === channels.length;

    useEffect(() => {
        if (allUnlocked) {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [allUnlocked]);

    const handleUnlock = (id: string, link?: string) => {
        if (!unlockedChannels.includes(id)) {
            const newUnlocked = [...unlockedChannels, id];
            setUnlockedChannels(newUnlocked);
            completeAction(`contact_${id}`);
        }
        if (link) window.open(link, '_blank');
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 pb-32 bg-game-bg">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl md:text-7xl font-display font-bold text-game-primary mb-4 tracking-tighter">
                    {allUnlocked ? 'VICTORY REACHED!' : 'FINAL BOSS: CONTACT'}
                </h2>
                <p className="text-game-text/60 font-mono italic max-w-md mx-auto">
                    {allUnlocked
                        ? 'All communication protocols established. Recruit Ayesha for your team.'
                        : 'Establish secure links to all channels to complete the professional quest.'}
                </p>
            </motion.div>

            <div className={`flex flex-wrap justify-center gap-12 mb-16 relative`}>
                {/* Visual Connector Line */}
                {!allUnlocked && (
                    <div className="absolute top-1/2 left-0 w-full h-px bg-game-secondary/20 -z-10" />
                )}

                {channels.map((ch, index) => {
                    const isUnlocked = unlockedChannels.includes(ch.id);
                    const Icon = ch.icon;

                    return (
                        <motion.button
                            key={ch.id}
                            onClick={() => handleUnlock(ch.id, ch.link)}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            className={`flex flex-col items-center gap-4 transition-all duration-500`}
                        >
                            <div className={`w-28 h-28 rounded-2xl flex items-center justify-center text-4xl border-4 relative
                                ${isUnlocked
                                    ? 'bg-game-primary/10 border-game-primary text-game-primary shadow-lg shadow-game-primary/20'
                                    : 'bg-game-bg border-game-secondary/30 text-game-secondary hover:border-game-primary/50'}`}>
                                <Icon />

                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-game-bg border-2 border-inherit flex items-center justify-center text-sm">
                                    {isUnlocked ? <HiLockOpen className="text-game-primary" /> : <HiLockClosed className="text-game-secondary" />}
                                </div>
                            </div>
                            <span className={`font-mono text-xs font-bold tracking-widest ${isUnlocked ? 'text-game-text' : 'text-game-secondary'}`}>
                                {isUnlocked ? ch.label : '???'}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {allUnlocked && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <motion.div
                            className="flex items-center gap-3 px-8 py-4 bg-game-accent/10 border border-game-accent rounded-xl"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <HiCheckCircle className="text-game-accent text-3xl" />
                            <div className="text-left">
                                <div className="text-game-accent font-display font-bold">QUEST COMPLETE</div>
                                <div className="text-game-text/80 text-xs font-mono">ALL CHANNELS UNLOCKED</div>
                            </div>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-6">
                            <a
                                href="/resume/Ayesha_Mohapatra_Resume.pdf"
                                download="Ayesha_Mohapatra_Resume.pdf"
                                className="
      px-10 py-5
      bg-game-primary
      text-game-bg
      font-display font-bold
      rounded-lg
      flex items-center gap-3
      hover:scale-105
      transition-all
      shadow-xl shadow-game-primary/20
    "
                            >
                                <FaFileDownload />
                                DOWNLOAD RESUME
                            </a>

                            <button
                                onClick={resetGame}
                                className="
      px-10 py-5
      bg-game-secondary/30
      text-game-text
      font-display font-bold
      rounded-lg
      hover:bg-game-secondary/50
      transition-all
    "
                            >
                                REPLAY JOURNEY
                            </button>
                        </div>


                        <div className="mt-12 text-center">
                            <p className="text-game-primary font-mono text-xs">Developed by Ayesha Mohapatra © 2026</p>
                            <p className="text-game-secondary font-mono text-[10px] mt-2">MINIMAL INTERACTIVE GAME PORTFOLIO SYSTEM v5.0</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
};

export default ContactBoss;
