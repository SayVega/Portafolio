import { useEffect, useRef } from "react";

const chars = " .:-=+*#%@";

type Wave = {
    speed: number;
    frequency: number;
    amplitude: number;
    phase: number;
};

type Flame = {
    x: number;
    height: number;
    width: number;
    wave1: Wave;
    wave2: Wave;
};

export default function FireBackground() {
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (media.matches) {
            return;
        }

        const width = 120;
        const height = 40;
        const frameDelay = 50;

        const fire = Array(width * height).fill(0);

        const tertiaryWave: Wave = {
            speed: 0.0011,
            frequency: 6.5,
            amplitude: 2,
            phase: 0.8,
        };

        const flames: Flame[] = [{x: 12, height: 30, width: 17,
                wave1: {
                    speed: 0.0015,
                    frequency: 5,
                    amplitude: 5,
                    phase: 0,
                },
                wave2: {
                    speed: 0.0021,
                    frequency: 8,
                    amplitude: 1.25,
                    phase: 1.7,
                },
            },
            {x: width - 13, height: 30, width: 17,
                wave1: {
                    speed: 0.0013,
                    frequency: 4.5,
                    amplitude: 5.5,
                    phase: 3.2,
                },
                wave2: {
                    speed: 0.002,
                    frequency: 7.2,
                    amplitude: 1.25,
                    phase: 4.8,
                },
            },
        ];

        let animationId: number;
        let lastFrame = 0;

        function drawFlame(
            flame: Flame,
            time: number
        ) {
            const tipWave = (Math.sin(time * 0.0007) + 1) / 2;

            const hiddenChars = Math.floor(tipWave * 4);

            const visibleHeight = flame.height - hiddenChars;

            for (let y = 0; y < visibleHeight; y++) {
                const progress = y / (flame.height - 1);

                const wave1 = Math.sin(time * flame.wave1.speed + flame.wave1.phase + progress * flame.wave1.frequency);

                const wave2 = Math.sin(time * flame.wave2.speed + flame.wave2.phase + progress * flame.wave2.frequency);
                                 
                const wave3 = Math.sin(time * tertiaryWave.speed + tertiaryWave.phase + progress * tertiaryWave.frequency);

                const rawWave =
                    wave1 * flame.wave1.amplitude +
                    wave2 * flame.wave2.amplitude +
                    wave3 * tertiaryWave.amplitude;

                const totalAmplitude =
                    flame.wave1.amplitude +
                    flame.wave2.amplitude +
                    tertiaryWave.amplitude;

                const normalizedWave =
                    rawWave / totalAmplitude;

                const waveEnvelope = 0.15 + 0.85 * Math.sin(Math.pow(progress, 0.7) * Math.PI);

                const wave = normalizedWave * waveEnvelope;

                const center = flame.x + wave * totalAmplitude;

                const taper = 1 - Math.pow(progress, 1.5);

                const side = (normalizedWave + 1) / 2;

                const leftWidth = flame.width * taper * (0.25 + (1 - side) * 0.75);

                const rightWidth = flame.width * taper * (0.25 + side * 0.75);

                const py = height - 1 - y;

                const start = Math.floor(center - leftWidth);

                const end = Math.ceil(center + rightWidth);

                for (let x = start; x <= end; x++) {
                    if ( x < 0 || x >= width || py < 0 || py >= height) {
                        continue;
                    }

                    let distance;

                    if (x < center) { 
                        distance = (center - x) / Math.max(leftWidth, 1);
                    } else {
                        distance = (x - center) / Math.max(rightWidth,1);
                    }

                    let intensity = 9 - distance * 5 - progress * 5;

                    intensity = Math.max(0, Math.min(9, intensity));

                    const index = py * width + x;

                    fire[index] = Math.max(fire[index], Math.floor(intensity));
                }
            }
        }

        function render(time: number) {
            if (time - lastFrame < frameDelay) {
                animationId = requestAnimationFrame(render);
                return;
            }

            lastFrame = time;

            fire.fill(0);

            for (const flame of flames) {
                drawFlame(flame, time);
            }

            let output = "";

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    output += chars[fire[y * width + x]];
                }
                output += "\n";
            }

            if (ref.current) {
                ref.current.textContent = output;
            }

            animationId =
                requestAnimationFrame(render);
        }

        animationId =
            requestAnimationFrame(render);

        return () =>
            cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="fire" aria-hidden="true">
            <pre ref={ref} className="fire-content" />
        </div>
    );
}