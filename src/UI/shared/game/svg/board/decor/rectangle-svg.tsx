import React from 'react';
import { getBoardGeometry } from '@/utils';

interface IRectangleSvg {
    positionOnBoard: 'top' | 'bottom';
    index: number;
}

export const RectangleSvg: React.FC<IRectangleSvg> = ({
    positionOnBoard,
    index,
}) => {
    const {
        pointWidth,
        leftStart,
        rightStart,
        topBaseY,
        bottomBaseY,
        tipYTop,
        tipYBottom,
        pocketR,
    } = getBoardGeometry();

    const centerXForTopIndex = (i: number): number =>
        i < 6
            ? leftStart + i * pointWidth + pointWidth / 2
            : rightStart + (i - 6) * pointWidth + pointWidth / 2;

    const centerXForBottomIndex = (i: number): number =>
        i < 6
            ? leftStart + i * pointWidth + pointWidth / 2
            : rightStart + (i - 6) * pointWidth + pointWidth / 2;

    const topPolygon = (cx: number): string => {
        const left = cx - pointWidth / 2;
        const right = cx + pointWidth / 2;
        return `${left},${topBaseY} ${right},${topBaseY} ${cx},${tipYTop}`;
    };

    const bottomPolygon = (cx: number): string => {
        const left = cx - pointWidth / 2;
        const right = cx + pointWidth / 2;
        return `${left},${bottomBaseY} ${right},${bottomBaseY} ${cx},${tipYBottom}`;
    };

    const cx =
        positionOnBoard === 'top'
            ? centerXForTopIndex(index)
            : centerXForBottomIndex(index);
    const isEven = index % 2 === 0;

    return (
        <g>
            <polygon
                points={
                    positionOnBoard === 'top'
                        ? topPolygon(cx)
                        : bottomPolygon(cx)
                }
                fill={isEven ? 'url(#triLight)' : 'url(#triDark)'}
                stroke="#2b190f"
                strokeOpacity={0.16}
                strokeWidth={0.8}
            />
            {positionOnBoard === 'top' && (
                <polygon
                    points={topPolygon(cx)}
                    fill="rgba(255,255,255,0.03)"
                    style={{ mixBlendMode: 'overlay' }}
                />
            )}

            {/* Маска заглиблення */}
            {positionOnBoard === 'top' ? (
                <defs>
                    <mask id={`mask-top-${index}`}>
                        <rect
                            x={cx - pocketR * 2}
                            y={topBaseY}
                            width={pocketR * 4}
                            height={pocketR}
                            fill="white"
                        />
                        <circle
                            cx={cx}
                            cy={topBaseY + pocketR}
                            r={pocketR}
                            fill="black"
                        />
                    </mask>
                </defs>
            ) : (
                <defs>
                    <mask id={`mask-bot-${index}`}>
                        <rect
                            x={cx - pocketR * 2}
                            y={bottomBaseY - pocketR}
                            width={pocketR * 4}
                            height={pocketR}
                            fill="white"
                        />
                        <circle
                            cx={cx}
                            cy={bottomBaseY - pocketR}
                            r={pocketR}
                            fill="black"
                        />
                    </mask>
                </defs>
            )}
            <rect
                x={cx - pocketR * 2}
                y={positionOnBoard === 'top' ? topBaseY : bottomBaseY - pocketR}
                width={pocketR * 4}
                height={pocketR}
                fill="url(#woodPattern)"
                mask={`url(#mask-${positionOnBoard === 'top' ? 'top' : 'bot'}-${index})`}
                filter="url(#pocketInner)"
            />
        </g>
    );
};
