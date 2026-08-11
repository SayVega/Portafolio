import { useEffect, useRef } from "react";

export default function FireBackground() {
    const ref = useRef<HTMLPreElement>(null);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (media.matches) {
            return;
        }

        const chars = " .:-=+*#%@";

        const width = Math.floor(window.innerWidth / 10);
        const height = 35;

        const fire = Array(width * height).fill(0);

        for (let x = 0; x < width; x++) {
            fire[(height - 1) * width + x] = chars.length - 1;
        }

        let animationId: number;

        function render() {
            for (let y = 1; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const src = y * width + x;
                    const dst = src - width;

                    const decay = Math.floor(Math.random() * 3);

                    fire[dst] = Math.max(fire[src] - decay, 0);
                }
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

            animationId = requestAnimationFrame(render);
        }

        animationId = requestAnimationFrame(render);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <pre
            ref={ref}
            className="fire"
            aria-hidden="true"
        />
    );
}