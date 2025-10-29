import { PlayerColorEnum } from '@/store/@types.ts';
import { type DicesModel } from '@/models/Dices.ts';
import { type SlotModel } from '@/models/Slot.ts';

export type PlayerModel = {
    counter: number;
    id: string;
    name: string;
    avatar: string;
    playerIndex: number;
    startIDX: number | null;
    endIDX: number | null;
    color: PlayerColorEnum | null;
    isActive: boolean;
    chipsRemaining: number;
    dices: DicesModel;
    homeSlotsIDXs: number[];
    bearOffSlot: SlotModel | null;
};
