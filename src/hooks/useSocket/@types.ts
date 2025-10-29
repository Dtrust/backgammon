import type { PlayerModel } from '@/models/Player.ts';
import type { GameModel } from '@/models/Game.ts';

export interface IGameRoom {
    id: string;
    players: Partial<PlayerModel>[];
    game: GameModel;
    isStarted: boolean;
    creatorSocketID: string;
    creatorPlayerID: PlayerModel['id'];
}
