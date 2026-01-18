import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { portfolioData } from '../../data/portfolio';
import { HiX, HiPlay } from 'react-icons/hi';

interface BaseMilestone {
    type: string;
    title: string;
    sub: string;
    duration: string;
}

interface EducationMilestone extends BaseMilestone {
    type: 'education';
    cgpa: string;
    coursework: string;
}

interface ExperienceMilestone extends BaseMilestone {
    type: 'experience';
    responsibilities: string[];
    techStack: string[];
}

type Milestone = EducationMilestone | ExperienceMilestone;

const Timeline: React.FC = () => {
    const { setCurrentLevel, unlockLevel, completeAction, gameState } = useGame();
    const [selectedExp, setSelectedExp] = useState<number | null>(null);

    const [visitedCheckpoints, setVisitedCheckpoints] = useState<number[]>(
        gameState.completedActions
            .filter(a => a.startsWith('checkpoint_'))
            .map(a => Number(a.replace('checkpoint_', '')))
    );

    const milestones: Milestone[] = [
        ...portfolioData.education.map(e => ({
            type: 'education' as const,
            ...e,
            title: e.institution,
            sub: e.degree
        })),
        ...portfolioData.experience.map(e => ({
            type: 'experience' as const,
            ...e,
            title: e.company,
            sub: e.role
        }))
    ];

    const currentMilestone =
        selectedExp !== null ? milestones[selectedExp] : null;

    const allVisited = visitedCheckpoints.length === milestones.length;

    const handleCheckpointClick = (index: number) => {
        setSelectedExp(index);
        if (!visitedCheckpoints.includes(index)) {
            setVisitedCheckpoints(prev => [...prev, index]);
            completeAction(`checkpoint_${index}`);
        }
    };

    const handleNext = () => {
        unlockLevel('contact');
        setCurrentLevel('contact');
    };

    return (
        <section className="min-h-screen px-4 md:px-16 py-24 relative overflow-hidden bg-game-bg">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(var(--game-primary) 1px, transparent 1px), linear-gradient(90deg, var(--game-primary) 1px, transparent 1px)`,
                        backgroundSize: '4rem 4rem'
                    }}
                />
            </div>

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-24 relative z-10"
            >
                <div className="text-game-accent font-mono text-xs mb-3 tracking-[0.3em]">
                    ◆ LEVEL 04: THE JOURNEY ◆
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-game-primary drop-shadow-[0_0_15px_rgba(var(--game-primary-rgb),0.3)]">
                    Quest Log
                </h2>
                <div className="mt-6 flex flex-col items-center gap-4">
                    <p className="text-game-text/60 text-sm font-mono max-w-md">
                        Relive the historical milestones of this developer's evolution. Discover all waypoints to unlock the final gate.
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full max-w-xs h-1.5 bg-game-secondary/20 rounded-full overflow-hidden border border-game-secondary/10 p-[1px]">
                        <motion.div
                            className="h-full bg-game-primary rounded-full shadow-[0_0_10px_var(--game-primary)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(visitedCheckpoints.length / milestones.length) * 100}%` }}
                        />
                    </div>
                    <div className="text-[10px] font-mono text-game-accent/70">
                        PROGRESS: {visitedCheckpoints.length} / {milestones.length} WAYPOINTS FOUND
                    </div>
                </div>

                {visitedCheckpoints.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 flex justify-center gap-2 text-game-accent text-xs font-mono"
                    >
                        <HiPlay className="animate-pulse" />
                        TAP A WAYPOINT TO COMMENCE
                    </motion.div>
                )}
            </motion.div>

            {/* TIMELINE */}
            <div className="relative max-w-5xl mx-auto z-10">
                {/* Center Line */}
                <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-b from-transparent via-game-secondary/30 to-transparent" />
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-game-primary to-transparent"
                        animate={{ top: ['-150px', '100%'] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />
                </div>

                <div className="space-y-32">
                    {milestones.map((ms, index) => {
                        const isVisited = visitedCheckpoints.includes(index);
                        const isLeft = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`relative flex flex-col md:flex-row items-start ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                {/* Node */}
                                <button
                                    onClick={() => handleCheckpointClick(index)}
                                    className={`absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl border-2 z-20 flex items-center justify-center transition-all duration-300 transform
                                    ${isVisited
                                            ? 'bg-game-primary border-game-primary shadow-[0_0_20px_var(--game-primary)] rotate-45'
                                            : 'bg-game-bg border-game-secondary/50 hover:border-game-primary hover:rotate-45'
                                        }`}
                                >
                                    <div className={`transform ${isVisited ? '-rotate-45 font-bold text-game-bg' : '-rotate-45 text-game-secondary'}`}>
                                        {index + 1}
                                    </div>
                                    {isVisited && (
                                        <span className="absolute inset-0 rounded-xl bg-game-primary/40 animate-ping" />
                                    )}
                                </button>

                                {/* Card */}
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onClick={() => handleCheckpointClick(index)}
                                    className={`w-[calc(100%-60px)] ml-14 md:ml-0 md:w-[42%] p-1 rounded-2xl cursor-pointer group
                                    ${isVisited
                                            ? 'bg-gradient-to-br from-game-primary/30 to-game-accent/30 shadow-lg shadow-game-primary/5'
                                            : 'bg-game-secondary/10'
                                        }`}
                                >
                                    <div className="bg-game-bg/90 backdrop-blur-xl p-6 rounded-[14px] border border-white/5 h-full relative overflow-hidden">
                                        {/* Glow effect on hover */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-game-primary opacity-0 group-hover:opacity-[0.03] rounded-full -mr-16 -mt-16 blur-3xl transition-opacity" />

                                        <div className="text-[10px] font-mono text-game-accent mb-2 tracking-widest flex items-center justify-between">
                                            <span>{ms.duration}</span>
                                            {isVisited && <span className="text-game-primary text-[8px] px-1.5 py-0.5 border border-game-primary/30 rounded uppercase">Recorded</span>}
                                        </div>

                                        <h3 className={`text-xl font-display font-bold mb-2 group-hover:text-game-primary transition-colors ${isVisited ? 'text-game-text' : 'text-game-text/60'}`}>
                                            {ms.title}
                                        </h3>

                                        <p className="text-game-text/60 text-sm font-mono mb-4 leading-relaxed">
                                            {ms.sub}
                                        </p>

                                        <div className={`mt-auto pt-4 border-t border-white/5 flex items-center gap-3`}>
                                            <span className={`text-[10px] font-mono px-2 py-1 rounded bg-game-secondary/10 border border-game-secondary/20
                                            ${ms.type === 'experience' ? 'text-blue-400' : 'text-purple-400'}`}>
                                                {ms.type === 'experience' ? 'MISSION' : 'ACADEMY'}
                                            </span>
                                            <div className="h-1 flex-1 bg-game-secondary/5 rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-1000 ${isVisited ? 'w-full bg-game-primary' : 'w-0 h-0'}`} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CONTINUE - Relative Position */}
                <AnimatePresence>
                    {allVisited && !selectedExp && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 50 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                            className="relative flex flex-col items-center justify-center mt-32 mb-16 z-50 text-center"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 50px rgba(var(--game-primary-rgb), 0.6)"
                                }}
                                whileTap={{ scale: 0.96 }}
                                onClick={handleNext}
                                className="
                                    px-12 py-5
                                    rounded-2xl
                                    bg-game-primary
                                    text-game-bg
                                    font-display font-black
                                    text-xl md:text-3xl
                                    uppercase tracking-tighter
                                    shadow-[0_0_30px_rgba(var(--game-primary-rgb),0.3)]
                                    flex items-center gap-4
                                    group
                                    transition-all
                                "
                            >
                                Final Level Access
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                >
                                    <HiPlay className="text-3xl" />
                                </motion.div>
                            </motion.button>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-6 text-game-accent font-mono text-xs tracking-widest uppercase animate-pulse"
                            >
                                Waypoint Sequence Complete • Entrance Available • Scroll Down
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {currentMilestone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-game-bg/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedExp(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-game-bg border-2 border-game-primary/30 p-1 rounded-3xl max-w-2xl w-full relative shadow-2xl shadow-game-primary/20"
                        >
                            <div className="bg-game-secondary/5 p-6 md:p-10 rounded-[22px] overflow-y-auto max-h-[85vh]">
                                <button
                                    className="absolute top-6 right-6 p-2 text-game-primary hover:bg-game-primary/10 rounded-full transition-all hover:rotate-90"
                                    onClick={() => setSelectedExp(null)}
                                >
                                    <HiX size={24} />
                                </button>

                                <div className="mb-8">
                                    <div className="text-game-accent font-mono text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                                        <span className="w-8 h-[1px] bg-game-accent/50" />
                                        {currentMilestone.type === 'experience' ? 'Mission Intelligence' : 'Academic Archives'}
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-display font-bold text-game-text drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] mb-2 uppercase italic">
                                        {currentMilestone.title}
                                    </h3>
                                    <p className="text-game-primary font-mono text-base md:text-lg mb-1">
                                        {currentMilestone.sub}
                                    </p>
                                    <p className="text-xs font-mono text-game-text/40">
                                        PERIOD: {currentMilestone.duration}
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {currentMilestone.type === 'experience' ? (
                                        <>
                                            <div>
                                                <h4 className="text-game-accent font-mono text-xs mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-game-accent" /> Objectives & Results
                                                </h4>
                                                <ul className="space-y-4">
                                                    {(currentMilestone as ExperienceMilestone).responsibilities.map((r, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.3 + i * 0.1 }}
                                                            className="flex items-start gap-4 text-game-text/80 text-sm md:text-base group"
                                                        >
                                                            <span className="text-game-primary mt-1 flex-shrink-0 group-hover:scale-125 transition-transform">▹</span>
                                                            <span className="font-mono leading-relaxed">{r}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="text-game-accent font-mono text-xs mb-4 uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-game-accent" /> Equipment & Tech
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {(currentMilestone as ExperienceMilestone).techStack.map((tech, i) => (
                                                        <motion.span
                                                            key={tech}
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: 0.5 + i * 0.05 }}
                                                            className="px-3 py-1.5 bg-game-primary/10 border border-game-primary/30 text-game-primary text-[10px] md:text-xs font-mono rounded-lg shadow-sm"
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-6 bg-game-bg/50 border border-white/5 rounded-2xl">
                                                <div className="text-game-accent font-mono text-[10px] uppercase mb-2">Academic Standing</div>
                                                <div className="text-2xl font-display font-bold text-game-primary">CGPA: {(currentMilestone as EducationMilestone).cgpa}</div>
                                            </div>
                                            <div className="p-6 bg-game-bg/50 border border-white/5 rounded-2xl">
                                                <div className="text-game-accent font-mono text-[10px] uppercase mb-2">Specialization</div>
                                                <div className="text-sm font-mono text-game-text/80 leading-relaxed">Focus on CS Fundamentals, DSA, and System Design.</div>
                                            </div>
                                            <div className="md:col-span-2 p-6 bg-game-bg/50 border border-white/5 rounded-2xl">
                                                <div className="text-game-accent font-mono text-[10px] uppercase mb-3">Key Curriculum</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {(currentMilestone as EducationMilestone).coursework.split(',').map((course, i) => (
                                                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-game-text/60">
                                                            {course.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-12 pt-6 border-t border-white/5 text-center">
                                    <button
                                        onClick={() => setSelectedExp(null)}
                                        className="text-game-accent font-mono text-xs uppercase hover:text-game-primary transition-colors tracking-[0.2em]"
                                    >
                                        [ CLOSE RECORD ]
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Space at the bottom */}
            <div className="h-48" />

            {/* Ambient Bottom Fade */}
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-game-bg to-transparent pointer-events-none z-40" />
        </section>
    );
};

export default Timeline;
