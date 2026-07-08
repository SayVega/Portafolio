import { useEffect, useState } from "react";
import randomSpeed from "../utils/randomSpeed";

interface TypeWriterProps {
    text: string;
    delay?: number;
    minSpeed?: number;
    maxSpeed?: number;
    randomFn?: (min: number, max:number) => number;
}

export default function TypeWriter({
    text,
    delay = 1500,
    minSpeed = 50,
    maxSpeed = 80,
    randomFn = randomSpeed,
}: TypeWriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        if (!typing) {
            return;
        }

        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        function type(index: number) {
            if (index >= text.length) {
                setTyping(false);
                return;
            }

            setDisplayedText(text.slice(0,index + 1));

            timeout = setTimeout(() => {
                type(index + 1);
            }, randomFn(minSpeed, maxSpeed));
        }

        timeout = setTimeout(() => {
            type(0);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay, minSpeed, maxSpeed, randomFn]);

    return (
        <span>
            {displayedText}
            {typing && (
                <span className={cursorVisible ? "opacity-100" : "opacity-0"}>
                    |
                </span>
             )}
        </span>
    );
}

