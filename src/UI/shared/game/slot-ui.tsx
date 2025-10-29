import React from 'react';
import { type SlotModel } from '@/models/Slot';
import { setChipPosition, setSlotPosition } from '@/utils';
import type { AnimationDataChip } from '@/store/@types.ts';
import { SlotSvg } from '@/UI/shared/game/svg';

interface ISlotProps {
    data?: SlotModel;
    isBearOffSlot?: boolean;
    setAnimationDataChip: React.Dispatch<
        React.SetStateAction<AnimationDataChip | null>
    >;
}

export const SlotUI: React.FC<ISlotProps> = ({
    data,
    setAnimationDataChip,
}) => {
    if (!data) return null;

    const { gameIndex, isHighlighted, chips } = data;

    const topChip = chips[chips.length - 1];
    const lastChipStackIDX = topChip ? topChip.stackIndex + 1 : 0;

    const { radius } = setChipPosition(gameIndex, lastChipStackIDX);
    const { x: slotX, yTop, yBottom } = setSlotPosition(gameIndex);

    // позиція підсвітки слота
    const highlightCY =
        chips.length === 0
            ? gameIndex < 12
                ? yBottom
                : yTop
            : gameIndex < 12
              ? yBottom - radius * chips.length * 2
              : yTop + radius * chips.length * 2;

    const handleMoveChip = (e: React.MouseEvent<SVGCircleElement>) => {
        e.stopPropagation();
        setAnimationDataChip(prev =>
            prev
                ? {
                      ...prev,
                      isMoving: true,
                      targetX: slotX - radius / 2 - 6,
                      targetY: highlightCY - radius / 2 - 6,
                      targetSlotIDX: data.gameIndex,
                  }
                : null,
        );
    };

    return (
        <SlotSvg
            slotX={slotX}
            gameIndex={gameIndex}
            isHighlighted={isHighlighted}
            handleMoveChip={handleMoveChip}
            yBottom={yBottom}
            yTop={yTop}
            highlightCY={highlightCY}
        />
    );
};
