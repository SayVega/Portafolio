import { useEffect, useRef } from "react";
import "../bgs/plasmabg.css";

const chars = " .:-=+*#%@";

export default function PlasmaBackground() {
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
        const frameDelay = 0;

        const plasma = Array(width * height).fill(0);

        const wave1 = {
            horizontalFrequency: 0.12,
            verticalFrequency: 0.18,
            speed: 0.001,
            weight: 0.35,
        };

        const wave2 = {
            frequency: 0.30,
            speed: 0.0013,
            weight: 0.25,
        };

        const wave3 = {
            frequency: 0.45,
            speed: 0.0009,
            weight: 0.25,
        };

        const wave4 = {
            frequency: 0.20,
            speed: 0.0007,
            weight: 0.15,
        };

        const orbit = {
            speed: 0.00008,
            strength: 0.035,
        };

        const rotation = {
            centerX: 0,
            centerY: 0,
            speed: 0.00006,
            strength: 0.035,
        };

        const structureWave = {
            frequency: 0.00035,
            speed: 0.00025,
            strength: 0.08,
        };

        const contrast = 1.5;

        let animationId: number;
        let lastFrame = 0;

        function drawPlasma(time: number) {
            const structureScale =
                1 +
                Math.sin(
                    time * structureWave.frequency
                ) *
                    structureWave.strength;

            const orbitAngle =
                time * orbit.speed;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let cx =
                        x -
                        width / 2 -
                        rotation.centerX;

                    let cy =
                        y -
                        height / 2 -
                        rotation.centerY;

                    const distance = Math.sqrt(
                        cx * cx + cy * cy
                    );

                    const angle = Math.atan2(
                        cy,
                        cx
                    );

                    const orbitalOffset =
                        Math.sin(
                            angle +
                                orbitAngle +
                                distance * 0.025
                        ) *
                        orbit.strength *
                        distance;

                    const rotatedAngle =
                        angle +
                        orbitalOffset;

                    cx =
                        Math.cos(rotatedAngle) *
                        distance;

                    cy =
                        Math.sin(rotatedAngle) *
                        distance;

                    const localX =
                        cx * structureScale;

                    const localY =
                        cy * structureScale;

                    const value1 =
                        Math.sin(
                            localX *
                                wave1.horizontalFrequency +
                                localY *
                                wave1.verticalFrequency +
                                time *
                                    wave1.speed
                        );

                    const value2 =
                        Math.sin(
                            localY *
                                wave2.frequency -
                                time *
                                    wave2.speed
                        );

                    const value3 =
                        Math.sin(
                            distance *
                                wave3.frequency *
                                structureScale -
                                time *
                                    wave3.speed
                        );

                    const value4 =
                        Math.sin(
                            (localX + localY) *
                                wave4.frequency +
                                time *
                                    wave4.speed
                        );

                    let value =
                        value1 *
                            wave1.weight +
                        value2 *
                            wave2.weight +
                        value3 *
                            wave3.weight +
                        value4 *
                            wave4.weight;

                    value =
                        (value + 1) / 2;

                    value = Math.max(
                        0,
                        Math.min(1, value)
                    );

                    value = Math.pow(
                        value,
                        contrast
                    );

                    const charIndex =
                        Math.floor(
                            value *
                                (chars.length - 1)
                        );

                    plasma[
                        y * width + x
                    ] = charIndex;
                }
            }
        }

        function render(time: number) {
            if (
                time - lastFrame <
                frameDelay
            ) {
                animationId =
                    requestAnimationFrame(
                        render
                    );

                return;
            }

            lastFrame = time;

            drawPlasma(time);

            let output = "";

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    output +=
                        chars[
                            plasma[
                                y * width + x
                            ]
                        ];
                }

                output += "\n";
            }

            if (ref.current) {
                ref.current.textContent =
                    output;
            }

            animationId =
                requestAnimationFrame(
                    render
                );
        }

        animationId =
            requestAnimationFrame(
                render
            );

        return () => {
            cancelAnimationFrame(
                animationId
            );
        };
    }, []);

    return (
        <pre
            ref={ref}
            className="plasma"
            aria-hidden="true"
        />
    );
}