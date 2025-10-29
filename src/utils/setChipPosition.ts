import { setSlotPosition } from '@/utils/setSlotPosition.ts';

type setChipPositionType = (
    slotIndex: number,
    stackIndex: number,
    radius?: number,
) => { x: number; y: number; radius: number };

export const setChipPosition: setChipPositionType = (
    slotIndex,
    stackIndex,
    radius = 22,
) => {
    const { x, yTop, yBottom } = setSlotPosition(slotIndex);
    const isTop = slotIndex >= 12;

    const y = isTop
        ? yTop + stackIndex * (radius * 2)
        : yBottom - stackIndex * (radius * 2);

    return { x, y, radius };
};
