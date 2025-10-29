import React from 'react';

interface IFieldSvg {
    vbW: number;
    vbH: number;
    padding: number;
}

export const FieldSvg: React.FC<IFieldSvg> = ({ vbW, vbH, padding }) => {
    return (
        <rect
            x={padding}
            y={padding}
            width={vbW - padding * 2}
            height={vbH - padding * 2}
            rx={12}
            ry={12}
            fill="#dcb98d"
            stroke="#4b2f22"
            strokeWidth={3}
            filter="url(#innerShadowField)"
        />
    );
};
