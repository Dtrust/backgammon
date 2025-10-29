import React from 'react';

interface ISlotSvgProps {
    slotX: number;
    gameIndex: number;
    isHighlighted: boolean;
    handleMoveChip: (e: React.MouseEvent<SVGCircleElement>) => void;
    yBottom: number;
    yTop: number;
    highlightCY: number;
}

export const SlotSvg: React.FC<ISlotSvgProps> = ({
    slotX,
    gameIndex,
    isHighlighted,
    handleMoveChip,
    yBottom,
    yTop,
    highlightCY,
}) => {
    return (
        <g aria-label="Slot">
            {/* прозорий слот */}
            <circle
                cx={slotX}
                cy={gameIndex < 12 ? yBottom : yTop}
                r={30}
                fill="transparent"
            />

            {/* активний слот */}
            {isHighlighted && (
                <circle
                    cx={slotX}
                    cy={highlightCY}
                    r={18}
                    fill="rgba(255, 255, 0, 0.4)"
                    stroke="orange"
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                    onClick={handleMoveChip}
                />
            )}
        </g>
    );
};
