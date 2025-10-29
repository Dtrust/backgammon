import React from 'react';
import { useResetGame, useSetGame } from '@/store/game';
import { socket } from '@/services/socket';
import {
    useActiveRoom,
    useMyPlayer,
    useResetActiveRoom,
    useSetActiveRoom,
    useSetIsConnected,
    useSetIsOpponentOffline,
    useSetRooms,
    useSetRoomTimer,
} from '@/store/myPlayer';
import type { PlayerModel } from '@/models/Player';
import type { IGameRoom } from './@types';
import type { GameModel } from '@/models/Game.ts';
import type { PlayerColorEnum } from '@/store/@types.ts';

export const useSocket = () => {
    const setGame = useSetGame();

    const myPlayer = useMyPlayer();
    const activeRoom = useActiveRoom();
    const setActiveRoom = useSetActiveRoom();
    const resetActiveRoom = useResetActiveRoom();
    const resetGame = useResetGame();

    const setRooms = useSetRooms();
    const setRoomTimer = useSetRoomTimer();
    const setIsConnected = useSetIsConnected();
    const setIsOpponentOffline = useSetIsOpponentOffline();

    const handleCreateRoom = () => {
        socket.emit('createRoom', myPlayer);
    };

    const handleCreateRoomForAI = () => {
        socket.emit('createRoomForAI', myPlayer);
    };

    const handleJoinRoom = (roomID: string, player: Partial<PlayerModel>) => {
        socket.emit('joinRoom', roomID, player);
    };

    const handleUnJoinRoom = (roomID: string, playerID: PlayerModel['id']) => {
        socket.emit('unJoinRoom', roomID, playerID);
    };

    const handleDeleteRoom = () => {
        socket.emit('deleteRoom', activeRoom?.id);
        resetActiveRoom();
    };
    // --- свідомий вихід гравця з кімнати ---
    const handleLeaveRoom = () => {
        socket.emit('leaveRoom');
    };

    const useFirstStepContest = () => {
        socket.emit('game:firstStepContest', activeRoom?.id);
    };

    const handleChooseColor = (color: PlayerColorEnum) => {
        socket.emit('game:choosePlayerColor', {
            roomID: activeRoom?.id,
            color,
            playerID: myPlayer!.id,
        });
    };

    const handleRollDice = () => {
        socket.emit('game:rollDices', { roomID: activeRoom?.id });
    };

    const handleMoveChip = (targetSlotIDX: number) => {
        socket.emit('game:moveChip', { roomID: activeRoom?.id, targetSlotIDX });
    };

    const handleToggleChipSelection = (
        slotIDX: number,
        x: number,
        y: number,
    ) => {
        socket.emit('game:toggleChipSelection', {
            roomID: activeRoom?.id,
            slotIDX,
            x,
            y,
        });
    };

    const handleNewGame = () => {
        socket.emit('game:newGame', { roomID: activeRoom?.id });
    };

    React.useEffect(() => {
        if (!socket.connected) socket.connect();

        const handleRequestRoomsList = (rooms: IGameRoom[]) => {
            setRooms(rooms);
        };

        const handleUpdateGameState = (game: GameModel) => {
            // console.log('handleUpdateGameState', game);
            setGame(game);
        };

        const handleTimerUpdate = (timer: number) => {
            setRoomTimer(timer);
        };

        const handlePlayerOffline = ({
            playerID,
        }: {
            playerID: PlayerModel['id'];
        }) => {
            setIsOpponentOffline(true);
            console.log('Player offline:', playerID);
        };

        const handleResetRoom = () => {
            resetGame();
            resetActiveRoom();
        };

        if (socket.connected) {
            socket.emit('requestRoomsList');
        }

        socket.off('connect');
        socket.off('disconnect');
        socket.off('roomCreated');
        socket.off('requestRoomsList');
        socket.off('game:update');
        socket.off('timer:update');
        socket.off('playerOffline');
        socket.off('opponentLeftRoom');

        socket.on('connect', () => {
            console.log('🟢 connected:', socket.id);
            setIsConnected(true);
            socket.emit('getRoomsList'); // получить список комнат
            // Переподключение игрока
            socket.emit('reconnectPlayer', myPlayer!.id);
        });

        socket.on('requestRoomsList', handleRequestRoomsList);
        socket.on('roomCreated', setActiveRoom);
        socket.on('game:update', handleUpdateGameState);
        socket.on('timer:update', handleTimerUpdate);
        socket.on('playerOffline', handlePlayerOffline);
        socket.on('opponentLeftRoom', handleResetRoom);

        // socket.on('game:reset', reset);

        socket.on('disconnect', reason => {
            console.log('🔴 disconnected:', reason);
            setIsConnected(false);
        });

        // return () => {
        //     socket.off('requestRoomsList');
        //     socket.off('roomCreated');
        //     socket.off('game:update');
        //     socket.off('game:reset');
        //     socket.off('timer:update');
        //     socket.off('playerOffline');
        //     socket.off('disconnect');
        // };
    }, [setGame]);

    return {
        handleCreateRoom,
        handleJoinRoom,
        handleUnJoinRoom,
        handleLeaveRoom,
        handleDeleteRoom,
        handleChooseColor,
        handleRollDice,
        handleMoveChip,
        handleToggleChipSelection,
        handleNewGame,
        useFirstStepContest,
        //for AI
        handleCreateRoomForAI,
    };
};
