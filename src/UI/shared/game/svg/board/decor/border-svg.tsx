import React from 'react';

interface IBoarderSvg {
    vbW: number;
    vbH: number;
}

export const BorderSvg: React.FC<IBoarderSvg> = ({ vbW, vbH }) => {
    return (
        <rect
            x={4}
            y={4}
            rx={22}
            ry={22}
            width={vbW - 8}
            height={vbH - 8}
            fill="url(#woodPattern)"
            stroke="#101010e3"
            strokeWidth={6}
        />
    );
};
