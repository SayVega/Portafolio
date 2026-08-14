import { useEffect, useRef } from "react";

const CHARS = " .:-=+*#%@";
const WIDTH = 112;
const HEIGHT = 40;
const TOTAL_CELLS = WIDTH * HEIGHT;
const FRAME_DELAY = 50;

type Wave = { speed: number; frequency: number; amplitude: number; phase: number; };
type Flame = { x: number; height: number; width: number; wave1: Wave; wave2: Wave; };

const TERTIARY_WAVE: Wave = { speed: 0.0011, frequency: 6.5, amplitude: 2, phase: 0.8 };
const FLAMES: Flame[] = [
    { x: 12, height: 30, width: 17,
        wave1: { speed: 0.0015, frequency: 5, amplitude: 5, phase: 0 },
        wave2: { speed: 0.0021, frequency: 8, amplitude: 1.25, phase: 1.7 },
    },
    { x: WIDTH - 13, height: 30, width: 17,
        wave1: { speed: 0.0013, frequency: 4.5, amplitude: 5.5, phase: 3.2 },
        wave2: { speed: 0.002, frequency: 7.2, amplitude: 1.25, phase: 4.8 },
    },
];

const INITIAL_PLACEHOLDER = Array(HEIGHT).fill(" ".repeat(WIDTH)).join("\n");

export default function FireBackground() {
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (media.matches) return () => {};

        const fire = new Int32Array(TOTAL_CELLS);
        const outputBuffer = new Array(TOTAL_CELLS + HEIGHT); 

        let animationId: number;
        let lastFrame = 0;

        function drawFlame(flame: Flame, time: number) {
            const tipWave = (Math.sin(time * 0.0007) + 1) * 0.5;
            const hiddenChars = (tipWave * 4) | 0;
            const visibleHeight = flame.height - hiddenChars;

            for (let y = 0; y < visibleHeight; y++) {
                const progress = y / (flame.height - 1);
                const wave1 = Math.sin(time * flame.wave1.speed + flame.wave1.phase + progress * flame.wave1.frequency);
                const wave2 = Math.sin(time * flame.wave2.speed + flame.wave2.phase + progress * flame.wave2.frequency);
                const wave3 = Math.sin(time * TERTIARY_WAVE.speed + TERTIARY_WAVE.phase + progress * TERTIARY_WAVE.frequency);

                const rawWave = wave1 * flame.wave1.amplitude + wave2 * flame.wave2.amplitude + wave3 * TERTIARY_WAVE.amplitude;
                const totalAmplitude = flame.wave1.amplitude + flame.wave2.amplitude + TERTIARY_WAVE.amplitude;
                const normalizedWave = rawWave / totalAmplitude;
                
                const progressPow = progress * Math.sqrt(progress); 
                const waveEnvelope = 0.15 + 0.85 * Math.sin(progressPow * Math.PI);

                const wave = normalizedWave * waveEnvelope;
                const center = flame.x + wave * totalAmplitude;
                const taper = 1 - (progress * progressPow);
                const side = (normalizedWave + 1) * 0.5;

                const leftWidth = flame.width * taper * (0.25 + (1 - side) * 0.75);
                const rightWidth = flame.width * taper * (0.25 + side * 0.75);
                const py = HEIGHT - 1 - y;

                if (py < 0 || py >= HEIGHT) continue;

                const start = Math.max(0, (center - leftWidth) | 0);
                const end = Math.min(WIDTH - 1, (center + rightWidth) | 0);
                const baseIndex = py * WIDTH;
                const maxLeft = Math.max(leftWidth, 1);
                const maxRight = Math.max(rightWidth, 1);
                const intensityBase = 9 - progress * 5;

                for (let x = start; x <= end; x++) {
                    const distance = x < center ? (center - x) / maxLeft : (x - center) / maxRight;
                    let intensity = intensityBase - distance * 5;

                    if (intensity < 0) intensity = 0;
                    else if (intensity > 9) intensity = 9;

                    const index = baseIndex + x;
                    const intVal = intensity | 0;
                    if (intVal > fire[index]) {
                        fire[index] = intVal;
                    }
                }
            }
        }

        function render(time: number) {
            if (time - lastFrame < FRAME_DELAY) {
                animationId = requestAnimationFrame(render);
                return;
            }
            lastFrame = time;

            fire.fill(0);

            for (let i = 0; i < FLAMES.length; i++) {
                drawFlame(FLAMES[i], time);
            }

            let bufIdx = 0;
            for (let y = 0; y < HEIGHT; y++) {
                const rowOffset = y * WIDTH;
                for (let x = 0; x < WIDTH; x++) {
                    outputBuffer[bufIdx++] = CHARS[fire[rowOffset + x]];
                }
                outputBuffer[bufIdx++] = "\n";
            }

            if (ref.current) {
                ref.current.textContent = outputBuffer.join("");
            }

            animationId = requestAnimationFrame(render);
        }

        animationId = requestAnimationFrame(render);
        
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="fire" aria-hidden="true">
            <pre ref={ref} className="fire-content">
                {INITIAL_PLACEHOLDER}
            </pre>
        </div>
    );
}