import React from 'react';

interface ICentralBarSvg {
    padding: number;
    pointWidth: number;
    barWidth: number;
    vbH: number;
}

export const CentralBarSvg: React.FC<ICentralBarSvg> = ({
    padding,
    vbH,
    barWidth,
    pointWidth,
}) => {
    return (
        <g>
            {/* загальний прямокутник з текстурою */}
            <rect
                x={padding + 6 * pointWidth}
                y={padding}
                width={barWidth}
                height={vbH - padding * 2}
                rx={6}
                ry={6}
                fill="url(#woodPattern)"
                stroke="#321f18"
                strokeWidth={1}
            />

            {/* вертикальна смуга по центру */}
            <line
                x1={padding + 6 * pointWidth + barWidth / 2}
                x2={padding + 6 * pointWidth + barWidth / 2}
                y1={padding}
                y2={vbH - padding}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth={1.5}
            />
        </g>
    );
};
