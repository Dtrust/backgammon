import React from 'react';

interface IDiceProps {
    value: number;
    size?: number;
}
export const DiceSvg: React.FC<IDiceProps> = ({ value, size = 80 }) => {
    // dots cords for square 1..6 const
    const dotCoords: Record<number, [number, number][]> = {
        1: [[0.5, 0.5]],
        2: [
            [0.25, 0.25],
            [0.75, 0.75],
        ],
        3: [
            [0.25, 0.25],
            [0.5, 0.5],
            [0.75, 0.75],
        ],
        4: [
            [0.25, 0.25],
            [0.25, 0.75],
            [0.75, 0.25],
            [0.75, 0.75],
        ],
        5: [
            [0.25, 0.25],
            [0.25, 0.75],
            [0.5, 0.5],
            [0.75, 0.25],
            [0.75, 0.75],
        ],
        6: [
            [0.25, 0.25],
            [0.25, 0.5],
            [0.25, 0.75],
            [0.75, 0.25],
            [0.75, 0.5],
            [0.75, 0.75],
        ],
    };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 1 1"
            style={{
                border: '2px solid black',
                borderRadius: 8,
                backgroundColor: 'white',
            }}>
            {' '}
            {dotCoords[value].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r={0.08} fill="black" />
            ))}{' '}
        </svg>
    );
};
