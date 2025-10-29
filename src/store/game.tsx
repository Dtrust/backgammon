import { create } from 'zustand/react';
import type { GameModel } from '@/models/Game';
import { devtools } from 'zustand/middleware';
import type { PlayerModel } from '@/models/Player.ts';

interface IInitialGameState {
    game: GameModel | null;
}

interface IGameActions {
    setGame: (data: Partial<GameModel>) => void;
    reset: () => void;
    rollDice: () => void;
    moveChip: (from: number, to: number) => void;
    chooseColor: (color: string) => void;
}

const initialGameState = {
    game: null,
};

interface IGameStore extends IInitialGameState, IGameActions {}

export const gameStore = create<IGameStore>()(
    devtools(set => ({
        ...initialGameState,
        setGame: (data: Partial<GameModel>) => {
            set(
                state => {
                    if (!state.game) {
                        return { game: data as GameModel };
                    }

                    // створюємо копію поточного стану
                    const prevGame = state.game;

                    // при оновленні гравців мерджим стейт
                    let mergedPlayers = prevGame.players;
                    if (data.players) {
                        mergedPlayers = data.players.map((playerPatch, idx) => {
                            const prevPlayer = prevGame.players[idx];

                            // якшо у стейті немає гравйя, оновлюємо його
                            if (!prevPlayer) return playerPatch;

                            // якщо немає аватара у оновленні, зберігаємо старий
                            if (
                                playerPatch.avatar == null &&
                                prevPlayer.avatar
                            ) {
                                return {
                                    ...prevPlayer,
                                    ...playerPatch,
                                    avatar: prevPlayer.avatar,
                                };
                            }
                            return { ...prevPlayer, ...playerPatch };
                        }) as PlayerModel[];
                    }

                    // збираємо фінальний стейт
                    const mergedGame = {
                        ...prevGame,
                        ...data,
                        players: mergedPlayers,
                    } as GameModel;

                    return { game: mergedGame };
                },
                undefined,
                'GAME_SET_GAME',
            );
        },
        reset: () => set({ game: null }),
    })),
);

//Selectors
export const useGame = () => gameStore(state => state.game);

export const useGameStarted = () =>
    gameStore(state => state.game?.isGameStarted);

export const usePlayerByID = (id: string) =>
    gameStore(state => state.game?.players.find(p => p.id === id));

//Actions
export const useSetGame = () => gameStore(state => state.setGame);

export const useResetGame = () => gameStore(state => state.reset);
