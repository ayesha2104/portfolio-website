import React, { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, ISourceOptions } from '@tsparticles/engine';

const ParticleBackground: React.FC = () => {
    const [init, setInit] = React.useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log('Particles loaded', container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: 'transparent',
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push',
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse',
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ['#0ea5e9', '#a855f7', '#38bdf8'],
                },
                links: {
                    color: '#0ea5e9',
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    direction: 'none',
                    enable: true,
                    outModes: {
                        default: 'bounce',
                    },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: 'circle',
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default ParticleBackground;
