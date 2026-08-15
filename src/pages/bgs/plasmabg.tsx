import { useEffect, useRef } from "react";
import "../bgs/plasmabg.css";

const CHARS = " .:-=+*#%@";
const WIDTH = 120;
const HEIGHT = 40;
const TOTAL_CELLS = WIDTH * HEIGHT;
const FRAME_DELAY = 50;

const WAVE1 = {
    horizontalFrequency: 0.12,
    verticalFrequency: 0.18,
    speed: 0.001,
    weight: 0.35,
};

const WAVE2 = {
    frequency: 0.30,
    speed: 0.0013,
    weight: 0.25,
};

const WAVE3 = {
    frequency: 0.45,
    speed: 0.0009,
    weight: 0.25,
};

const WAVE4 = {
    frequency: 0.20,
    speed: 0.0007,
    weight: 0.15,
};

const ORBIT = {
    speed: 0.00008,
    strength: 0.035,
};

const ROTATION = {
    centerX: 0,
    centerY: 0,
    speed: 0.00006,
    strength: 0.035,
};

const STRUCTURE_WAVE = {
    frequency: 0.00035,
    speed: 0.00025,
    strength: 0.08,
};

const CONTRAST = 1.5;

const INITIAL_PLACEHOLDER = Array(HEIGHT)
    .fill(" ".repeat(WIDTH))
    .join("\n");

export default function PlasmaBackground() {
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const media = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (media.matches) {
            return () => {};
        }

        const plasma = new Int32Array(TOTAL_CELLS);
        const outputBuffer = new Array(
            TOTAL_CELLS + HEIGHT
        );

        let animationId: number;
        let lastFrame = 0;

        function drawPlasma(time: number) {
            const structureScale =
                1 +
                Math.sin(
                    time * STRUCTURE_WAVE.frequency
                ) *
                    STRUCTURE_WAVE.strength;

            const orbitAngle =
                time * ORBIT.speed;

            const rotationAngle =
                time * ROTATION.speed;

            for (let y = 0; y < HEIGHT; y++) {
                const rowOffset = y * WIDTH;

                for (let x = 0; x < WIDTH; x++) {
                    let cx = x - WIDTH / 2 - ROTATION.centerX;
                    let cy = y - HEIGHT / 2 - ROTATION.centerY;

                    const distance = Math.sqrt( cx * cx + cy * cy );
                    const angle = Math.atan2( cy, cx );
                    const orbitalOffset = Math.sin( angle + orbitAngle + distance * 0.025) * ORBIT.strength * distance;
                    const rotatedAngle = angle + orbitalOffset + rotationAngle * ROTATION.strength;

                    cx = Math.cos(rotatedAngle) * distance;
                    cy = Math.sin(rotatedAngle) * distance;

                    const localX = cx * structureScale;
                    const localY = cy * structureScale;

                    const value1 = Math.sin(localX * WAVE1.horizontalFrequency + localY * WAVE1.verticalFrequency + time * WAVE1.speed);
                    const value2 = Math.sin(localY * WAVE2.frequency - time * WAVE2.speed);
                    const value3 = Math.sin(distance * WAVE3.frequency * structureScale - time * WAVE3.speed);
                    const value4 = Math.sin((localX + localY) *WAVE4.frequency + time * WAVE4.speed);

                    let value = value1 * WAVE1.weight + value2 * WAVE2.weight + value3 * WAVE3.weight + value4 * WAVE4.weight;
                    value = (value + 1) * 0.5;

                    if (value < 0) {
                        value = 0;
                    } else if (value > 1) {
                        value = 1;
                    }

                    value = Math.pow(value, CONTRAST);

                    plasma[rowOffset + x] = (value * (CHARS.length - 1)) | 0;
                }
            }
        }

        function render(time: number) {
            if (time - lastFrame <FRAME_DELAY) {
                animationId = requestAnimationFrame(render);
                return;
            }

            lastFrame = time;

            drawPlasma(time);

            let bufferIndex = 0;

            for (let y = 0; y < HEIGHT; y++) {
                const rowOffset = y * WIDTH;

                for (let x = 0; x < WIDTH; x++) {
                    outputBuffer[bufferIndex++] = CHARS[plasma[rowOffset + x]];
                }

                outputBuffer[bufferIndex++] = "\n";
            }

            if (ref.current) {
                ref.current.textContent = outputBuffer.join("");
            }

            animationId = requestAnimationFrame(render);
        }

        animationId = requestAnimationFrame(render);

        return () =>
            cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="plasma" aria-hidden="true">
            <pre ref={ref}>
                {INITIAL_PLACEHOLDER}
            </pre>
        </div>
    );
}