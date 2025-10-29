import type { SlotModel } from '@/models/Slot.ts';

export enum GameTypeEnum {
    OFFLINE = 'offline',
    ONLINE = 'online',
}

export enum PlayerColorEnum {
    WHITE = 'white',
    BLACK = 'black',
}

export type AnimationDataChip = {
    chipID: string;
    isMoving: boolean;
    targetX: number;
    targetY: number;
    targetSlotIDX: SlotModel['gameIndex'];
};
