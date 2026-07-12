'use client';

import { useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    className?: string;
}

export default function AnimatedCounter({
                                            value,
                                            suffix = '',
                                            className = ''
                                        }: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(value);

    const spring = useSpring(0, {
        mass: 0.8,
        stiffness: 75,
        damping: 15
    });

    useEffect(() => {
        spring.set(value);
        const unsubscribe = spring.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });

        return () => unsubscribe();
    }, [spring, value]);

    return (
        <span className={className}>
      {displayValue.toLocaleString()}{suffix}
    </span>
    );
}
