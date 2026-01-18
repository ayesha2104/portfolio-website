import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

const Landing: React.FC = () => {
    const { setCurrentLevel, unlockLevel } = useGame();
    const [bootPhase, setBootPhase] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [realMousePos, setRealMousePos] = useState({ x: 0, y: 0 });

    const bootLogs = [
        "> INITIALIZING KERNEL...",
        "> LOADING RENDERING ENGINE...",
        "> SYNCING NEURAL INTERFACE...",
        "> ACCESS GRANTED: AYESHA_v5.0"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setBootPhase(prev => {
                if (prev >= bootLogs.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);
        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        setRealMousePos({ x: e.clientX, y: e.clientY });
        setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 20,
            y: (e.clientY / window.innerHeight - 0.5) * 20
        });
    };

    const handleStart = () => {
        unlockLevel('about');
        setCurrentLevel('about');
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center bg-game-bg overflow-hidden select-none"
        >
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]"
                style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }} />

            {/* CRT Flicker & Vignette */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-40 bg-radial-vignette opacity-20"
                animate={{ opacity: [0.15, 0.2, 0.15] }}
                transition={{ repeat: Infinity, duration: 0.1 }}
            />

            {/* Background Grid */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(var(--game-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--game-secondary) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    x: mousePos.x,
                    y: mousePos.y
                }}
            />

            {/* Custom Cursor (Reticle) */}
            <motion.div
                className="fixed w-8 h-8 border border-game-primary/30 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center"
                animate={{ x: realMousePos.x, y: realMousePos.y }}
                transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
                style={{ transform: 'translate(-50%, -50%)', left: 0, top: 0 }}
            >
                <div className="w-1 h-1 bg-game-primary rounded-full shadow-[0_0_8px_var(--game-primary)]" />
                <div className="absolute -inset-1 border-t-2 border-l-2 border-game-primary/20 w-2 h-2" />
                <div className="absolute -inset-1 border-b-2 border-r-2 border-game-primary/20 w-2 h-2 self-end ml-auto" />
            </motion.div>

            <div className="relative z-10 max-w-4xl w-full">
                {/* Boot Logs */}
                <div className="absolute -top-32 left-0 right-0 h-20 font-mono text-[10px] text-game-primary/40 text-left overflow-hidden hidden md:block">
                    <AnimatePresence>
                        {bootLogs.slice(0, bootPhase).map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: bootPhase >= bootLogs.length ? 1 : 0, y: bootPhase >= bootLogs.length ? 0 : 30 }}
                >
                    <div className="relative inline-block group">
                        {/* Glitch layers */}
                        <motion.h1
                            className="text-6xl md:text-9xl font-display font-black mb-4 tracking-tighter text-game-text relative z-10"
                            whileHover={{ scale: 1.02 }}
                        >
                            AYESHA MOHAPATRA
                        </motion.h1>
                        <motion.h1
                            className="text-6xl md:text-9xl font-display font-black mb-4 tracking-tighter text-game-accent absolute top-0 left-0 -z-10 opacity-70 group-hover:block hidden"
                            animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
                            transition={{ repeat: Infinity, duration: 0.1 }}
                        >
                            AYESHA MOHAPATRA
                        </motion.h1>
                    </div>

                    <motion.div
                        className="flex items-center justify-center gap-4 mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="h-px w-12 bg-game-primary/30" />
                        <p className="text-sm md:text-base font-mono text-game-primary uppercase tracking-[0.5em] font-bold">
                            Software Development Engineer
                        </p>
                        <div className="h-px w-12 bg-game-primary/30" />
                    </motion.div>

                    <div className="relative inline-block">
                        {/* High-energy button */}
                        <motion.div
                            className="absolute -inset-4 bg-game-primary/20 rounded-xl blur-2xl flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        />

                        <motion.button
                            onClick={handleStart}
                            className="relative px-16 py-8 bg-game-bg border-2 border-game-primary text-game-primary font-display text-3xl font-bold rounded-xl overflow-hidden group shadow-[0_0_50px_rgba(var(--color-primary),0.2)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Filling progress effect */}
                            <motion.div
                                className="absolute inset-x-0 bottom-0 bg-game-primary/10"
                                initial={{ height: 0 }}
                                whileHover={{ height: '100%' }}
                                transition={{ duration: 0.4 }}
                            />

                            <span className="relative z-10 tracking-[0.2em] group-hover:tracking-[0.4em] transition-all duration-300">
                                START QUEST
                            </span>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-game-primary" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-game-primary" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-game-primary" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-game-primary" />
                        </motion.button>

                        <div className="absolute -bottom-12 left-0 right-0 text-[8px] font-mono text-game-secondary uppercase tracking-widest opacity-40">
                            Establish neural link to begin journey
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 text-[8px] font-mono text-game-secondary text-left -rotate-90 origin-top-left opacity-20">
                    LATENCY: 0.002ms // ENCRYPTION: AES-256
                </div>
            </div>

            {/* Ambiance Code snippets (peripheral) */}
            <div className="absolute bottom-10 right-10 text-[6px] font-mono text-game-secondary/20 text-right hidden lg:block">
                <div>while(alive) &#123;</div>
                <div>  eat();</div>
                <div>  sleep();</div>
                <div>  code();</div>
                <div>  repeat();</div>
                <div>&#125;</div>
            </div>
        </section>
    );
};

export default Landing;
