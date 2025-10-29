import type { PlayerModel } from '@/models/Player.ts';
import { create } from 'zustand/react';
import { devtools, persist } from 'zustand/middleware';
import type { IGameRoom } from '@/hooks/useSocket/@types.ts';

export interface IMyPlayerState {
    player: Partial<PlayerModel> | null;
    activeRoom: IGameRoom | null;
    rooms: IGameRoom[];
    roomTimer: number | null;
    isConnected: boolean;
    isOpponentOffline: boolean;
}

const initialMyPlayerState: IMyPlayerState = {
    player: {
        id: '',
        name: '',
        avatar: '',
    },
    activeRoom: null,
    rooms: [],
    roomTimer: null,
    isConnected: false,
    isOpponentOffline: false,
};

interface IMyPlayerActions {
    setPlayer: (player: IMyPlayerState['player']) => void;
    updatePlayer: (partial: Partial<PlayerModel>) => void;
    setActiveRoom: (room: IGameRoom) => void;
    resetActiveRoom: () => void;
    setIsConnected: (isConnected: boolean) => void;
    setIsOpponentOffline: (isOpponentOffline: boolean) => void;
    setRoomTimer: (roomTimer: number) => void;
    setRooms: (rooms: IGameRoom[]) => void;
}

export interface IMyPlayerStore extends IMyPlayerState, IMyPlayerActions {}

export const myPlayerStore = create<IMyPlayerStore>()(
    devtools(
        persist(
            set => ({
                ...initialMyPlayerState,
                setPlayer: (player: IMyPlayerState['player']) =>
                    set({ player }, undefined, 'MY_PLAYER_SET_PLAYER'),
                updatePlayer: (partial: Partial<PlayerModel>) =>
                    set(
                        state => ({
                            player: state.player
                                ? { ...state.player, ...partial }
                                : null,
                        }),
                        undefined,
                        'MY_PLAYER_UPDATE_PLAYER',
                    ),
                setIsConnected: (isConnected: boolean) =>
                    set(
                        state => {
                            state.isConnected = isConnected;
                            return { isConnected: state.isConnected };
                        },
                        undefined,
                        'MY_PLAYER_SET_IS_CONNECTED',
                    ),
                setRoomTimer: (roomTimer: number) =>
                    set(
                        state => {
                            state.roomTimer = roomTimer;
                            return { roomTimer: state.roomTimer };
                        },
                        undefined,
                        'MY_PLAYER_SET_ROOM_TIMER',
                    ),
                setRooms: (rooms: IGameRoom[]) =>
                    set(
                        state => {
                            state.rooms = rooms;
                            return { rooms: state.rooms };
                        },
                        undefined,
                        'MY_PLAYER_SET_ROOMS',
                    ),
                setIsOpponentOffline: (isOpponentOffline: boolean) =>
                    set(
                        state => {
                            state.isOpponentOffline = isOpponentOffline;
                            return {
                                isOpponentOffline: state.isOpponentOffline,
                            };
                        },
                        undefined,
                        'MY_PLAYER_SET_IS_OPPONENT_OFFLINE',
                    ),
                setActiveRoom: room =>
                    set(
                        state => {
                            state.activeRoom = room;
                            return { activeRoom: state.activeRoom };
                        },
                        undefined,
                        'MY_PLAYER_SET_ACTIVE_ROOM',
                    ),
                resetActiveRoom: () =>
                    set(
                        { activeRoom: null },
                        undefined,
                        'MY_PLAYER_RESET_ACTIVE_ROOM',
                    ),
            }),
            { name: 'player', partialize: state => ({ player: state.player }) },
        ),
        { name: 'myPlayer' },
    ),
);

// Selectors
export const useMyPlayer = () => myPlayerStore(state => state.player);

export const useActiveRoom = () => myPlayerStore(state => state.activeRoom);

export const useRoomTimer = () => myPlayerStore(state => state.roomTimer);

export const useIsConnected = () => myPlayerStore(state => state.isConnected);

export const useIsOpponentOffline = () =>
    myPlayerStore(state => state.isOpponentOffline);
export const useRooms = () => myPlayerStore(state => state.rooms);

// Actions
export const useUpdateMyPlayer = () =>
    myPlayerStore(state => state.updatePlayer);

export const useSetActiveRoom = () =>
    myPlayerStore(state => state.setActiveRoom);

export const useResetActiveRoom = () =>
    myPlayerStore(state => state.resetActiveRoom);

export const useSetRooms = () => myPlayerStore(state => state.setRooms);

export const useSetRoomTimer = () => myPlayerStore(state => state.setRoomTimer);

export const useSetIsConnected = () =>
    myPlayerStore(state => state.setIsConnected);

export const useSetIsOpponentOffline = () =>
    myPlayerStore(state => state.setIsOpponentOffline);
