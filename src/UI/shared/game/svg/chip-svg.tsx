import React from 'react';

interface IChipSvgProps {
    color: string;
    radius: number;
}

export const ChipSvg: React.FC<IChipSvgProps> = ({ color, radius }) => {
    return (
        <>
            <defs>
                {/* загальний градієнт */}
                <radialGradient id={`grad-${color}`} cx="50%" cy="50%" r="50%">
                    {color === 'white' ? (
                        <>
                            <stop offset="0%" stopColor="#fff" />
                            <stop offset="60%" stopColor="#eee" />
                            <stop offset="100%" stopColor="#ccc" />
                        </>
                    ) : (
                        <>
                            <stop offset="0%" stopColor="#666" />
                            <stop offset="60%" stopColor="#444" />
                            <stop offset="100%" stopColor="#111" />
                        </>
                    )}
                </radialGradient>

                {/* Заглиблення по центру */}
                <radialGradient
                    id={`innerShadow-${color}`}
                    cx="50%"
                    cy="50%"
                    r="50%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>

                {/* пульсація при виділенні */}
                <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,255,150,0.8)" />
                    <stop offset="60%" stopColor="rgba(0,255,150,0.4)" />
                    <stop offset="100%" stopColor="rgba(0,255,150,0)" />
                </radialGradient>
            </defs>

            {/* основне коло */}
            <circle
                cx={radius}
                cy={radius}
                r={radius}
                fill={`url(#grad-${color})`}
                stroke={color === 'white' ? '#ccc' : '#000'}
                strokeWidth={1.5}
            />

            {/* Заглиблення по центру  */}
            <circle
                cx={radius}
                cy={radius}
                r={radius * 0.6}
                fill={`url(#innerShadow-${color})`}
            />
        </>
    );
};
