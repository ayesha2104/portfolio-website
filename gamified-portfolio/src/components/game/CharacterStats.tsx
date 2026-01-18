import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { portfolioData } from '../../data/portfolio';
import { HiLightningBolt, HiCode, HiUsers, HiAcademicCap, HiChevronRight, HiShieldCheck } from 'react-icons/hi';

const CharacterStats: React.FC = () => {
    const { setCurrentLevel, unlockLevel, completeAction, gameState } = useGame();
    const [revealedStats, setRevealedStats] = useState<string[]>(
        gameState.completedActions.filter(a => a.startsWith('stat_')).map(a => a.replace('stat_', ''))
    );
    const [hoveredStat, setHoveredStat] = useState<string | null>(null);

    const stats = portfolioData.personal.stats;
    const allRevealed = revealedStats.length === stats.length;
    const xpPercentage = (revealedStats.length / stats.length) * 100;

    const handleStatClick = (label: string) => {
        if (!revealedStats.includes(label)) {
            const newRevealed = [...revealedStats, label];
            setRevealedStats(newRevealed);
            completeAction(`stat_${label}`);
        }
    };

    const handleNext = () => {
        unlockLevel('skills');
        setCurrentLevel('skills');
    };

    const gearItems = [
        { name: 'Neural Link v2.0', icon: '🧠', buff: '+10% Focus' },
        { name: 'Void Cloak', icon: '🛡️', buff: 'Hidden from Bugs' },
        { name: 'Crystal Keyboard', icon: '⌨️', buff: 'x2 Words Per Minute' }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center p-4 md:p-8 pb-32 bg-game-bg overflow-hidden relative">
            {/* Background Grid/Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--game-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 relative z-10">
                {/* Character Card (Left Side) */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full lg:w-1/3 space-y-6"
                >
                    <div className="bg-game-secondary/10 border-2 border-game-primary/30 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-game-primary/40 uppercase">System Status: Nominal</div>

                        {/* Avatar */}
                        <div className="flex flex-col items-center mb-8">
                            <motion.div
                                className="w-32 h-32 rounded-2xl border-4 border-game-primary relative flex items-center justify-center bg-game-bg group"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    className="absolute inset-0 border-2 border-game-accent opacity-0"
                                    animate={{ opacity: [0, 0.5, 0], scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                />
                                <span className="text-6xl group-hover:scale-110 transition-transform">👩‍💻</span>
                            </motion.div>

                            <h2 className="mt-4 text-2xl font-display font-bold text-game-primary tracking-widest text-center uppercase">
                                {portfolioData.personal.name}
                            </h2>
                            <p className="text-xs font-mono text-game-text/60">{allRevealed ? 'LEVEL 99 ARCHITECT' : `LEVEL ${portfolioData.personal.level} DEVELOPER`}</p>
                        </div>

                        {/* XP Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono font-bold">
                                <span className="text-game-accent">XP PROGRESS</span>
                                <span className="text-game-text">{Math.round(xpPercentage)}%</span>
                            </div>
                            <div className="h-3 bg-game-bg border border-game-secondary/30 rounded-full overflow-hidden p-0.5">
                                <motion.div
                                    className="h-full bg-game-accent rounded-full shadow-[0_0_10px_rgba(var(--color-accent),0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpPercentage}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>

                        {/* Bio / Voice Log */}
                        <div className="mt-8 bg-game-bg/50 p-4 rounded-lg border border-game-secondary/20">
                            <div className="text-[10px] font-mono text-game-primary mb-2 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                CORE_BIO.LOG
                            </div>
                            <p className="text-xs font-mono text-game-text/80 leading-relaxed italic">
                                {portfolioData.personal.intro}
                            </p>
                        </div>
                    </div>

                    {/* Inventory / Gear (Extra Flavor) */}
                    <div className="bg-game-secondary/5 border border-game-secondary/20 p-4 rounded-xl">
                        <div className="text-[10px] font-mono text-game-secondary mb-4 uppercase">Active Gear</div>
                        <div className="grid grid-cols-3 gap-3">
                            {gearItems.map((item, i) => (
                                <div key={i} className="aspect-square bg-game-bg border border-game-secondary/30 rounded flex items-center justify-center text-xl relative group cursor-help transition-colors hover:border-game-primary/50">
                                    {item.icon}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-28 p-2 bg-game-primary text-game-bg text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center shadow-xl">
                                        <div className="font-bold uppercase tracking-tighter">{item.name}</div>
                                        <div className="text-game-bg/80 font-mono mt-0.5">{item.buff}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Attributes (Right Side) */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex-1 space-y-6"
                >
                    <div className="bg-game-bg/40 border-2 border-game-secondary/20 p-6 md:p-8 rounded-2xl backdrop-blur-sm relative h-full">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-display font-bold text-game-text tracking-tighter uppercase">Attributes</h3>
                                <p className="text-[10px] font-mono text-game-secondary mt-1 uppercase tracking-widest">Sync system nodes to reveal capability</p>
                            </div>
                            <div className="text-center md:text-right border-l-0 md:border-l-2 border-game-secondary/20 pl-0 md:pl-6">
                                <div className="text-[10px] font-mono text-game-secondary uppercase tracking-widest">Current Rank</div>
                                <div className="text-xl font-display font-bold text-game-primary italic tracking-tighter uppercase">S-RANK ENGINEER</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {stats.map((stat, index) => {
                                const isRevealed = revealedStats.includes(stat.label);
                                const Icon = stat.label === "DSA & Problem Solving" ? HiLightningBolt :
                                    stat.label === "System Design" ? HiCode :
                                        stat.label === "Backend Engineering" ? HiUsers : HiAcademicCap;

                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="relative"
                                        onHoverStart={() => setHoveredStat(stat.label)}
                                        onHoverEnd={() => setHoveredStat(null)}
                                    >
                                        <button
                                            onClick={() => handleStatClick(stat.label)}
                                            className={`w-full group text-left transition-all duration-300 ${!isRevealed ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl border transition-all duration-500
                                                        ${isRevealed
                                                            ? 'bg-game-primary/10 border-game-primary text-game-primary shadow-[0_0_15px_rgba(var(--color-primary),0.2)]'
                                                            : 'bg-game-secondary/5 border-game-secondary/30 text-game-secondary'}`}>
                                                        <Icon />
                                                    </div>
                                                    <div>
                                                        <div className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors ${isRevealed ? 'text-game-text' : 'text-game-secondary/60'}`}>
                                                            {isRevealed ? stat.label : 'Access Denied'}
                                                        </div>
                                                        <div className="text-[9px] font-mono text-game-accent/60 uppercase">
                                                            {isRevealed ? 'Status: Active' : 'Status: Encrypted'}
                                                        </div>
                                                    </div>
                                                </div>
                                                {isRevealed && (
                                                    <div className="text-xl font-display font-bold text-game-primary italic">{stat.value}</div>
                                                )}
                                            </div>

                                            <div className="h-4 bg-game-bg border border-game-secondary/20 rounded-sm relative overflow-hidden p-[1px]">
                                                <AnimatePresence>
                                                    {!isRevealed && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-game-secondary/5 flex items-center justify-center z-10"
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <div className="text-[7px] font-mono text-game-secondary/40 animate-pulse uppercase tracking-[0.3em] font-bold">Decrypting...</div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: isRevealed ? `${stat.value}%` : 0 }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className={`h-full relative overflow-hidden ${isRevealed ? 'bg-game-primary' : ''}`}
                                                >
                                                    {isRevealed && (
                                                        <>
                                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }} />
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                                animate={{ x: ['-100%', '200%'] }}
                                                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                                            />
                                                        </>
                                                    )}
                                                </motion.div>
                                            </div>
                                        </button>

                                        {/* Description Tooltip / Buff */}
                                        <AnimatePresence>
                                            {isRevealed && hoveredStat === stat.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    className="absolute z-30 top-full mt-2 left-0 right-0 bg-game-primary p-3 rounded-lg shadow-2xl shadow-game-primary/40 border border-white/10"
                                                >
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <HiShieldCheck className="text-game-bg" />
                                                        <span className="text-[10px] font-mono font-bold text-game-bg uppercase tracking-widest">Active Passive</span>
                                                    </div>
                                                    <p className="text-xs text-game-bg leading-tight font-display italic">
                                                        "{stat.description}"
                                                    </p>
                                                    <div className="mt-1 h-0.5 w-full bg-game-bg/20 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-game-bg"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 0.5 }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer Info */}
                        <div className="mt-16 pt-8 border-t border-game-secondary/10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                <div className="text-[10px] font-mono text-game-secondary uppercase tracking-[0.4em] font-bold">System Revision 01.18.26</div>
                                <div className="text-[8px] font-mono text-game-secondary-40 uppercase">All systems prioritized for efficiency</div>
                            </div>

                            <AnimatePresence>
                                {allRevealed && (
                                    <motion.button
                                        initial={{ scale: 0, opacity: 0, rotate: -5 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 25px var(--game-accent)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleNext}
                                        className="px-10 py-4 bg-game-accent text-game-bg font-display font-bold rounded-lg shadow-xl shadow-game-accent/20 flex items-center gap-3 transition-all group"
                                    >
                                        UNFOLD SKILL TREE
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <HiChevronRight className="text-xl" />
                                        </motion.div>
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CharacterStats;
