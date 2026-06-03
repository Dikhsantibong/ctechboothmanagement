import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function SplitText({ text, className = '', delay = 100 }: SplitTextProps) {
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const words = text.split(' ');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const springs = useSprings(
        words.length,
        words.map((_, i) => ({
            from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
            to: {
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? 'translate3d(0,0px,0)' : 'translate3d(0,40px,0)',
            },
            delay: i * delay,
            config: { mass: 1, tension: 200, friction: 15 },
        }))
    );

    return (
        <div ref={ref} className={`inline-block ${className}`}>
            {springs.map((props, i) => (
                <animated.span
                    key={i}
                    style={props}
                    className="inline-block mr-[0.25em] will-change-transform"
                >
                    {words[i]}
                </animated.span>
            ))}
        </div>
    );
}
