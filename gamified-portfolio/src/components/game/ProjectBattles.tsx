import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { portfolioData } from '../../data/portfolio';
import { HiX, HiChevronRight, HiStar } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const ProjectBattles: React.FC = () => {
    const { setCurrentLevel, unlockLevel, completeAction, gameState } = useGame();
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
    const [completedProjects, setCompletedProjects] = useState<number[]>(
        gameState.completedActions.filter(a => a.startsWith('project_')).map(a => parseInt(a.replace('project_', '')))
    );

    const projects = portfolioData.projects;
    const allCompleted = completedProjects.length === projects.length;

    const handleProjectClick = (index: number) => {
        setSelectedProjectIndex(index);
        if (!completedProjects.includes(index)) {
            const newCompleted = [...completedProjects, index];
            setCompletedProjects(newCompleted);
            completeAction(`project_${index}`);
        }
    };

    const handleNext = () => {
        unlockLevel('experience');
        setCurrentLevel('experience');
    };

    return (
        <section className="min-h-screen p-8 pb-32 flex flex-col items-center justify-center relative">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-game-primary mb-2 uppercase tracking-tighter">
                    CHOOSE YOUR BATTLE
                </h2>
                <p className="text-game-text/60 font-mono">Defeat the architecture challenges</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
                {projects.map((project, index) => {
                    const isCompleted = completedProjects.includes(index);
                    const difficulty = index === 0 ? 3 : index === 1 ? 4 : 5;

                    return (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`w-full md:w-80 p-8 rounded-2xl border-4 transition-all cursor-pointer relative overflow-hidden group
                                ${isCompleted ? 'border-game-primary bg-game-secondary/10' : 'border-game-secondary/30 bg-game-bg'}`}
                            onClick={() => handleProjectClick(index)}
                        >
                            {isCompleted && (
                                <div className="absolute top-2 right-2 text-game-primary">
                                    <HiStar className="w-6 h-6" />
                                </div>
                            )}

                            <div className="flex flex-col h-full">
                                <span className="font-mono text-game-accent text-xs mb-2 uppercase tracking-widest">PROJECT {index + 1}</span>
                                <h3 className="text-2xl font-display font-bold text-game-text mb-4 leading-tight group-hover:text-game-primary transition-colors">
                                    {project.title.split('-')[0].trim()}
                                </h3>

                                <div className="flex items-center gap-1 mb-6">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <HiStar key={i} className={`w-4 h-4 ${i < difficulty ? 'text-game-primary' : 'text-game-secondary/30'}`} />
                                    ))}
                                    <span className="text-[10px] text-game-secondary ml-2 uppercase font-mono">DIFFICULTY</span>
                                </div>

                                <motion.div
                                    className="mt-auto px-4 py-2 border-2 border-game-primary text-game-primary font-mono text-center text-xs font-bold rounded group-hover:bg-game-primary group-hover:text-game-bg transition-all"
                                >
                                    FIGHT CHALLENGE
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Battle Overlay / Modal */}
            <AnimatePresence>
                {selectedProjectIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-game-bg/95 backdrop-blur-md"
                        onClick={() => setSelectedProjectIndex(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-game-secondary/20 border-2 border-game-primary p-8 rounded-2xl max-w-2xl w-full relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProjectIndex(null)}
                                className="absolute top-4 right-4 text-game-primary hover:text-game-accent transition-colors"
                            >
                                <HiX className="w-8 h-8" />
                            </button>

                            <div className="mb-6">
                                <span className="text-game-accent font-mono text-sm tracking-tighter uppercase">⚔️ BATTLE LOG: {projects[selectedProjectIndex].title}</span>
                                <h3 className="text-4xl font-display font-bold text-game-text mt-2 uppercase">{projects[selectedProjectIndex].title}</h3>
                                <p className="text-game-primary font-mono text-sm mt-1">{projects[selectedProjectIndex].role}</p>
                                {projects[selectedProjectIndex].status === 'Completed' ? (
                                    <span className="text-game-accent font-mono text-sm tracking-tighter uppercase">{projects[selectedProjectIndex].status}</span>
                                ) : (
                                    <span className="text-game-secondary font-mono text-sm tracking-tighter uppercase">{projects[selectedProjectIndex].status}</span>
                                )}
                            </div>

                            <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
                                <div>
                                    <h4 className="text-game-accent font-mono text-xs uppercase mb-2 tracking-widest">The Challenge</h4>
                                    <p className="text-game-text leading-relaxed">{projects[selectedProjectIndex].description}</p>
                                </div>

                                <div>
                                    <h4 className="text-game-accent font-mono text-xs uppercase mb-2 tracking-widest">Tactical Weapons (Tech Stack)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {projects[selectedProjectIndex].techStack.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-game-primary/10 border border-game-primary/30 text-game-primary text-xs font-mono rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {projects[selectedProjectIndex].features && (
                                    <div>
                                        <h4 className="text-game-accent font-mono text-xs uppercase mb-2 tracking-widest">Victory Achieved</h4>
                                        <ul className="space-y-2">
                                            {projects[selectedProjectIndex].features?.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2 text-game-text text-sm">
                                                    <span className="text-game-primary">✓</span> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4 border-t border-game-secondary/20">
                                    {projects[selectedProjectIndex].github && (
                                        <a href={projects[selectedProjectIndex].github} target="_blank" rel="noopener noreferrer"
                                            className="flex-1 py-3 bg-game-secondary/30 hover:bg-game-secondary/50 text-game-text font-display font-bold rounded flex items-center justify-center gap-2 transition-colors">
                                            <FaGithub /> SOURCE CODE
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {allCompleted && !selectedProjectIndex && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleNext}
                        className="mt-12 px-12 py-4 bg-game-accent text-game-bg font-display font-bold rounded-lg shadow-xl shadow-game-accent/20 flex items-center gap-2 hover:scale-105 transition-all"
                    >
                        COLLECT CAREER CHECKPOINTS <HiChevronRight />
                    </motion.button>
                )}
            </AnimatePresence>

            <div className="mt-8 font-mono text-game-secondary text-sm">
                CHALLENGES DEFEATED: {completedProjects.length} / {projects.length}
            </div>
        </section>
    );
};

export default ProjectBattles;
