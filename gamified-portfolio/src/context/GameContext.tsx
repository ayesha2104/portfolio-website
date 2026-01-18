import React, { createContext, useContext, useState, useEffect } from 'react';

type Level = 'landing' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

interface GameState {
    currentLevel: Level;
    unlockedLevels: Level[];
    completedActions: string[];
    playerStats: Record<string, number>;
}

interface GameContextType {
    gameState: GameState;
    setCurrentLevel: (level: Level) => void;
    unlockLevel: (level: Level) => void;
    completeAction: (actionId: string) => void;
    updateStat: (statId: string, value: number) => void;
    resetGame: () => void;
}

const initialState: GameState = {
    currentLevel: 'landing',
    unlockedLevels: ['landing'],
    completedActions: [],
    playerStats: {},
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>(() => {
        const saved = localStorage.getItem('portfolio_game_state');
        return saved ? JSON.parse(saved) : initialState;
    });

    useEffect(() => {
        localStorage.setItem('portfolio_game_state', JSON.stringify(gameState));
    }, [gameState]);

    const setCurrentLevel = (level: Level) => {
        setGameState(prev => ({ ...prev, currentLevel: level }));
    };

    const unlockLevel = (level: Level) => {
        setGameState(prev => ({
            ...prev,
            unlockedLevels: prev.unlockedLevels.includes(level)
                ? prev.unlockedLevels
                : [...prev.unlockedLevels, level]
        }));
    };

    const completeAction = (actionId: string) => {
        setGameState(prev => ({
            ...prev,
            completedActions: prev.completedActions.includes(actionId)
                ? prev.completedActions
                : [...prev.completedActions, actionId]
        }));
    };

    const updateStat = (statId: string, value: number) => {
        setGameState(prev => ({
            ...prev,
            playerStats: { ...prev.playerStats, [statId]: value }
        }));
    };

    const resetGame = () => {
        setGameState(initialState);
        localStorage.removeItem('portfolio_game_state');
    };

    return (
        <GameContext.Provider value={{
            gameState,
            setCurrentLevel,
            unlockLevel,
            completeAction,
            updateStat,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
