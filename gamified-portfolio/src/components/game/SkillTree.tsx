import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { portfolioData } from '../../data/portfolio';
import { HiChevronRight, HiLightningBolt, HiEye, HiSparkles } from 'react-icons/hi';

const SkillTree: React.FC = () => {
    const { setCurrentLevel, unlockLevel, completeAction, gameState } = useGame();
    const [isScanning, setIsScanning] = useState(false);

    // Flatten skills and manage unlocked state
    const allSkills = portfolioData.skills.flatMap(cat =>
        cat.items.map(s => ({ ...s, category: cat.category }))
    );

    const [unlockedSkills, setUnlockedSkills] = useState<string[]>(
        gameState.completedActions.filter(a => a.startsWith('skill_')).map(a => a.replace('skill_', ''))
    );

    const isFullyUnlocked = unlockedSkills.length === allSkills.length;

    const handleSkillClick = useCallback((skillName: string, category: string) => {
        setUnlockedSkills(prev => {
            if (prev.includes(skillName)) return prev;

            // Trigger side effects after the state update is queued
            setTimeout(() => {
                completeAction(`skill_${skillName}`);

                const categoryData = portfolioData.skills.find(cat => cat.category === category);
                if (categoryData) {
                    const currentIndex = categoryData.items.findIndex(s => s.name === skillName);
                    if (currentIndex !== -1 && currentIndex < categoryData.items.length - 1) {
                        const nextSkill = categoryData.items[currentIndex + 1];
                        setTimeout(() => {
                            handleSkillClick(nextSkill.name, category);
                        }, 350);
                    }
                }
            }, 0);

            return [...prev, skillName];
        });
    }, [completeAction]);

    const handleUnlockCategory = (category: string) => {
        const catData = portfolioData.skills.find(c => c.category === category);
        if (catData && catData.items.length > 0) {
            handleSkillClick(catData.items[0].name, category);
        }
    };

    const handleNeuralScan = async () => {
        setIsScanning(true);
        for (const cat of portfolioData.skills) {
            handleSkillClick(cat.items[0].name, cat.category);
            await new Promise(r => setTimeout(r, 600)); // Stagger categories
        }
        setTimeout(() => setIsScanning(false), 2000);
    };

    const handleNext = () => {
        unlockLevel('projects');
        setCurrentLevel('projects');
    };

    return (
        <section className="min-h-screen p-8 pb-32 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-game-primary mb-4">
                    ABILITY TREE
                </h2>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-game-text/60 font-mono">Unlock nodes to discover technical masteries</p>
                    {!isFullyUnlocked && (
                        <button
                            onClick={handleNeuralScan}
                            disabled={isScanning}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 font-mono text-xs font-bold transition-all
                                ${isScanning
                                    ? 'border-game-accent text-game-accent opacity-50 cursor-not-allowed'
                                    : 'border-game-primary text-game-primary hover:bg-game-primary/10 hover:shadow-lg hover:shadow-game-primary/20'}`}
                        >
                            {isScanning ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <HiLightningBolt />
                                    </motion.div>
                                    SCANNING NEURAL NETWORK...
                                </>
                            ) : (
                                <>
                                    <HiEye />
                                    INITIALIZE NEURAL SCAN
                                </>
                            )}
                        </button>
                    )}
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {portfolioData.skills.map((category, catIndex) => (
                    <div key={category.category} className="space-y-6">
                        <div className="flex items-center justify-between mb-4 border-b border-game-accent/20 pb-2">
                            <h3 className="text-game-accent font-display text-xl">
                                {category.category}
                            </h3>
                            <button
                                onClick={() => handleUnlockCategory(category.category)}
                                className="text-game-accent/40 hover:text-game-accent transition-colors p-1"
                                title="Unlock Branch"
                            >
                                <HiSparkles className="text-lg" />
                            </button>
                        </div>
                        {category.items.map((skill, skillIndex) => {
                            const isUnlocked = unlockedSkills.includes(skill.name);
                            const Icon = skill.icon;

                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: catIndex * 0.2 + skillIndex * 0.1 }}
                                    className="relative"
                                >
                                    <button
                                        onClick={() => handleSkillClick(skill.name, category.category)}
                                        className={`w-full p-4 rounded-lg flex items-center gap-4 transition-all border-2 group
                                            ${isUnlocked
                                                ? 'bg-game-secondary/20 border-game-primary text-game-text shadow-inner'
                                                : 'bg-game-bg border-game-secondary/30 text-game-secondary hover:border-game-primary/50'}`}
                                    >
                                        <div className={`w-12 h-12 rounded bg-game-bg flex items-center justify-center text-2xl
                                            ${isUnlocked ? 'text-game-primary shadow-lg shadow-game-primary/10' : 'text-game-secondary opacity-30 group-hover:opacity-60'}`}>
                                            {Icon ? <Icon /> : <HiLightningBolt className="opacity-50" />}
                                            {!isUnlocked && (
                                                <motion.div
                                                    className="absolute inset-0 bg-game-primary/5 rounded"
                                                    animate={{ opacity: [0, 0.2, 0] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-bold">{skill.name}</div>
                                            {isUnlocked && (
                                                <div className="mt-1 h-1.5 w-full bg-game-bg rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-game-primary"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.proficiency}%` }}
                                                        transition={{ duration: 1 }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {isUnlocked ? (
                                            <div className="text-game-primary text-xs font-mono font-bold">LVL {Math.ceil(skill.proficiency / 10)}</div>
                                        ) : (
                                            <div className="text-game-secondary text-xs font-mono">LOCKED</div>
                                        )}
                                    </button>

                                    {/* Line connector with flow animation */}
                                    {skillIndex < category.items.length - 1 && (
                                        <div className="absolute left-10 top-full h-6 w-0.5 bg-game-secondary/20 overflow-hidden">
                                            {isUnlocked && (
                                                <motion.div
                                                    initial={{ y: "-100%" }}
                                                    animate={{ y: "100%" }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-full h-full bg-game-primary/50"
                                                />
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="mt-16 flex flex-col items-center gap-6">
                <div className="text-game-primary font-mono text-sm">
                    SKILLS DISCOVERED: {unlockedSkills.length} / {allSkills.length}
                </div>

                <AnimatePresence>
                    {isFullyUnlocked && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={handleNext}
                            className="px-12 py-4 bg-game-primary text-game-bg font-display font-bold rounded-lg shadow-xl shadow-game-primary/20 flex items-center gap-2"
                        >
                            CONTINUE TO QUESTS <HiChevronRight />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SkillTree;
