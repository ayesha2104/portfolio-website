import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

type Level = 'landing' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

const Navigation: React.FC = () => {
    const { gameState, setCurrentLevel } = useGame();

    const levels: { id: Level; label: string }[] = [
        { id: 'landing', label: '1' },
        { id: 'about', label: '2' },
        { id: 'skills', label: '3' },
        { id: 'projects', label: '4' },
        { id: 'experience', label: '5' },
        { id: 'contact', label: '6' },
    ];

    return (
        <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                className="bg-game-secondary/20 backdrop-blur-xl border border-game-primary/30 py-4 px-8 rounded-full flex items-center gap-6 shadow-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                {levels.map((level) => {
                    const isActive = gameState.currentLevel === level.id;
                    const isUnlocked = gameState.unlockedLevels.includes(level.id);

                    return (
                        <div key={level.id} className="relative group">
                            <button
                                onClick={() => isUnlocked && setCurrentLevel(level.id)}
                                disabled={!isUnlocked}
                                className={`w-3 h-3 rounded-full transition-all duration-500 relative z-10
                                    ${isActive ? 'bg-game-accent scale-150' : isUnlocked ? 'bg-game-primary hover:scale-125' : 'bg-game-secondary opacity-50'}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-game-accent/30 rounded-full blur-sm"
                                    />
                                )}
                            </button>

                            {/* Label on Hover */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-game-bg border border-game-primary/50 text-game-primary text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase font-mono">
                                {isUnlocked ? level.id : 'LOCKED'}
                            </div>
                        </div>
                    );
                })}

                <div className="h-4 w-px bg-game-secondary/30 mx-2" />

                <div className="text-[10px] font-mono font-bold text-game-primary">
                    LVL {levels.findIndex(l => l.id === gameState.currentLevel) + 1}
                </div>
            </motion.div>
        </nav>
    );
};

export default Navigation;
