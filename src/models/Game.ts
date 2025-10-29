import { type SlotModel } from '@/models/Slot.ts';
import { type PlayerModel } from '@/models/Player.ts';
import { GameTypeEnum, PlayerColorEnum } from '@/store/@types.ts';

export type GameModel = {
    id: string;
    type: GameTypeEnum;
    slots: SlotModel[];
    possibleMoves: { fromSlot: SlotModel; targetSlot: SlotModel }[];
    players: PlayerModel[];
    isStartSlotUsed: boolean;
    activePlayerID: PlayerModel['id'] | null;
    firstStepPlayerID: string | null;
    firstStepContestData: {
        playerID: string;
        value: number;
    }[];
    isGameStarted: boolean;
    possibleColors: { id: number; color: PlayerColorEnum }[];
};
