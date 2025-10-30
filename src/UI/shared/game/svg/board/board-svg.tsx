import React from 'react';
import woodTexture from '@/assets/wood-texture.webp';
import {
    BorderSvg,
    CentralBarSvg,
    FieldSvg,
    RectangleSvg,
} from '@/UI/shared/game/svg/board/decor';
import { getBoardGeometry } from '@/utils';

interface IBoardSvg {
    children: React.ReactNode;
}

export const BoardSvg: React.FC<IBoardSvg> = ({ children }) => {
    const { vbW, vbH, padding, barWidth, pointWidth } = getBoardGeometry();

    return (
        <svg viewBox={`0 0 ${vbW} ${vbH}`}>
            <g
                width={vbW}
                height={vbH}
                style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                role="img"
                aria-label="BoarSvg">
                <defs>
                    <pattern
                        id="woodPattern"
                        patternUnits="userSpaceOnUse"
                        width={vbW}
                        height={vbH}>
                        <image
                            href={woodTexture}
                            x="0"
                            y="0"
                            width={vbW}
                            height={vbH}
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </pattern>
                    <linearGradient id="triLight" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f0d5b1" />
                        <stop offset="100%" stopColor="#d19b62" />
                    </linearGradient>
                    <linearGradient id="triDark" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#b07a4d" />
                        <stop offset="100%" stopColor="#6d3f26" />
                    </linearGradient>
                </defs>

                {/* рамка */}
                <BorderSvg vbW={vbW} vbH={vbH} />

                {/* Поле */}
                <FieldSvg vbW={vbW} vbH={vbH} padding={padding} />

                {/* Центральний бар */}
                <CentralBarSvg
                    padding={padding}
                    pointWidth={pointWidth}
                    barWidth={barWidth}
                    vbH={vbH}
                />

                {/* Верхні трикутники */}
                {Array.from({ length: 12 }).map((_, index) => (
                    <RectangleSvg
                        key={`top-${index}`}
                        positionOnBoard={'top'}
                        index={index}
                    />
                ))}

                {/* Нижні трикутники */}
                {Array.from({ length: 12 }).map((_, index) => (
                    <RectangleSvg
                        key={`bottom-${index}`}
                        positionOnBoard={'bottom'}
                        index={index}
                    />
                ))}
                {children}
            </g>
        </svg>
    );
};
