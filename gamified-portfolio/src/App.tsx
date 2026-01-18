import React, { Suspense, lazy } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navigation from './components/Navigation';

// Lazy load game levels
const Landing = lazy(() => import('./components/game/Landing'));
const CharacterStats = lazy(() => import('./components/game/CharacterStats'));
const SkillTree = lazy(() => import('./components/game/SkillTree'));
const ProjectBattles = lazy(() => import('./components/game/ProjectBattles'));
const Timeline = lazy(() => import('./components/game/Timeline'));
const ContactBoss = lazy(() => import('./components/game/ContactBoss'));

const LevelController: React.FC = () => {
  const { gameState } = useGame();

  const renderLevel = () => {
    switch (gameState.currentLevel) {
      case 'landing': return <Landing />;
      case 'about': return <CharacterStats />;
      case 'skills': return <SkillTree />;
      case 'projects': return <ProjectBattles />;
      case 'experience': return <Timeline />;
      case 'contact': return <ContactBoss />;
      default: return <Landing />;
    }
  };

  return (
    <main className="min-h-screen bg-game-bg text-game-text overflow-x-hidden selection:bg-game-accent/30 selection:text-game-text">
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-game-bg text-game-primary font-display animate-pulse">
          LOADING WORLD...
        </div>
      }>
        {renderLevel()}
      </Suspense>
      {gameState.currentLevel !== 'landing' && <Navigation />}
    </main>
  );
};

function App() {
  return (
    <GameProvider>
      <LevelController />
    </GameProvider>
  );
}

export default App;
