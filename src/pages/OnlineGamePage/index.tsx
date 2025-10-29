import React from 'react';
import { MainLayout, ModalBase } from '@/UI';
import { Button, Flex, Spinner } from '@radix-ui/themes';
import { useSocket } from '@/hooks';
import { useGame, useResetGame } from '@/store/game.tsx';
import { Game } from '@/components';
import {
    useActiveRoom,
    useIsConnected,
    useIsOpponentOffline,
    useResetActiveRoom,
    useRooms,
    useSetIsOpponentOffline,
} from '@/store/myPlayer.tsx';
import { RoomsTable } from '@/components/OnlineRoomsTable';
import { WaitingModal } from '@/components/Modals';
import { useBlocker } from '@tanstack/react-router';

export const OnlineGamePage: React.FC = () => {
    const {
        handleCreateRoom,
        handleDeleteRoom,
        handleJoinRoom,
        handleUnJoinRoom,
        handleLeaveRoom,
    } = useSocket();

    const game = useGame();
    const activeRoom = useActiveRoom();
    const resetGame = useResetGame();
    const resetActiveRoom = useResetActiveRoom();

    const setIsOpponentOffline = useSetIsOpponentOffline();
    const isOpponentOffline = useIsOpponentOffline();
    const isConnected = useIsConnected();
    const rooms = useRooms();

    const handleCreate = () => {
        handleCreateRoom();
    };

    const handleBackToLobby = () => {
        if (!activeRoom) return;
        handleDeleteRoom();
        setIsOpponentOffline(false);
        resetGame();
        resetActiveRoom();
    };

    useBlocker({
        shouldBlockFn: () => {
            if (!game) return false;

            const shouldLeave = confirm('Are you sure you want to leave?');
            if (shouldLeave) {
                resetGame();
                resetActiveRoom();
                setIsOpponentOffline(false);
                handleLeaveRoom();
                handleBackToLobby();
            }
            return !shouldLeave;
        },
        enableBeforeUnload: game?.isGameStarted,
    });

    return (
        <>
            {game ? (
                <MainLayout>
                    <Game game={game} />
                    <ModalBase
                        isOpen={!isConnected}
                        maxWidth={'300px'}
                        title="Connection lost"
                        description="You have been disconnected from the server"
                        align="center">
                        <Flex justify="center" align="center">
                            <Spinner size="3" />
                        </Flex>
                    </ModalBase>
                    <ModalBase
                        isOpen={isOpponentOffline}
                        title="Opponent player left the game"
                        align="center"
                        maxWidth={'300px'}>
                        <Flex justify="center" align="center">
                            <Button onClick={handleBackToLobby}>
                                Back to Lobby
                            </Button>
                        </Flex>
                    </ModalBase>
                </MainLayout>
            ) : (
                <>
                    <MainLayout>
                        <RoomsTable
                            rooms={rooms}
                            handleJoinRoom={handleJoinRoom}
                        />
                        <Flex justify="center">
                            <Button onClick={handleCreate} size="4">
                                Create New Game
                            </Button>
                        </Flex>
                    </MainLayout>
                    <WaitingModal
                        isWaitModalOpen={!!activeRoom?.id}
                        handleDeleteRoom={handleDeleteRoom}
                        handleUnJoinRoom={handleUnJoinRoom}
                    />
                </>
            )}
        </>
    );
};
