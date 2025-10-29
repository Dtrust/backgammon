import type { PlayerColorEnum } from '@/store/@types.ts';

export type ChipModel = {
    counter: number;
    id: string;
    color: PlayerColorEnum;
    slotIndex: number;
    stackIndex: number;
    isHighlighted: boolean;
    x?: number;
    y?: number;
};
