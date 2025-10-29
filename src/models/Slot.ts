import { type ChipModel } from '@/models/Chip.ts';
import { PlayerColorEnum } from '@/store/@types.ts';

export type SlotModel = {
    id: string;
    gameIndex: number;
    indexFor: Record<PlayerColorEnum, number>;
    isHighlighted: boolean;
    isEmpty: boolean;
    startFor: PlayerColorEnum | null;
    homeFor: { color: PlayerColorEnum; value: number } | null;
    occupiedColor: PlayerColorEnum | null;
    chips: ChipModel[];
};
