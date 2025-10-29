import { getBoardGeometry } from '@/utils/getBoardGeometry';

export type SlotPositionType = {
    x: number; // центр по X
    yTop: number; // центр верхнього ряду
    yBottom: number; // центр нижнього ряду
};

export const setSlotPosition = (slotIndex: number): SlotPositionType => {
    const {
        leftStart,
        rightStart,
        topBaseY,
        bottomBaseY,
        pointWidth,
        pocketR,
    } = getBoardGeometry();

    const defaultYTop = topBaseY + pocketR;
    const defaultYBottom = bottomBaseY - pocketR;

    const isTop = slotIndex >= 12;
    const localIdx = isTop ? slotIndex - 12 : slotIndex;
    const mirroredIdx = isTop ? 11 - localIdx : localIdx;
    const colInRow = mirroredIdx % 6;
    const isRightSide = mirroredIdx >= 6;

    const x = isRightSide
        ? rightStart + colInRow * pointWidth + pointWidth / 2
        : leftStart + colInRow * pointWidth + pointWidth / 2;

    // спеціальні позиції для викиду (bearOff)
    if (slotIndex === -1) {
        const x = rightStart + 6 * pointWidth + 28;
        return { x, yTop: defaultYTop, yBottom: defaultYBottom };
    }

    if (slotIndex === -2) {
        const x = leftStart - pointWidth + 40;
        return { x, yTop: 63, yBottom: defaultYBottom };
    }

    return { x, yTop: defaultYTop, yBottom: defaultYBottom };
};
