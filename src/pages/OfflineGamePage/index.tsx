import React from 'react';
import { useSocket } from '@/hooks';
import { MainLayout, ModalBase } from '@/UI';
import { Button, Flex } from '@radix-ui/themes';
import { useBlocker, useNavigate } from '@tanstack/react-router';
import { useGame, useResetGame } from '@/store/game.tsx';
import { Game } from '@/components';
import { useResetActiveRoom } from '@/store/myPlayer.tsx';

export const OfflineGamePage: React.FC = () => {
    const { handleCreateRoomForAI } = useSocket();
    const navigate = useNavigate();

    const game = useGame();
    const resetGame = useResetGame();
    const resetActiveRoom = useResetActiveRoom();

    const [startGameModal, setStartGameModal] = React.useState<boolean>(true);

    const handleCreate = () => {
        handleCreateRoomForAI();
        setStartGameModal(false);
    };

    const handleCancel = () => {
        setStartGameModal(false);
        resetActiveRoom();
        resetGame();
        navigate({ to: '/' });
    };

    useBlocker({
        shouldBlockFn: () => {
            if (!game) return false;

            const shouldLeave = confirm('Are you sure you want to leave?');
            if (shouldLeave) {
                resetGame();
                resetActiveRoom();
            }
            return !shouldLeave;
        },
        enableBeforeUnload: game?.isGameStarted,
    });

    return (
        <MainLayout>
            {game && <Game game={game} />}
            <ModalBase
                isOpen={startGameModal}
                title="Start Game"
                align="center"
                maxWidth={'300px'}>
                <Flex justify="center" align="center" gap="2">
                    <Button onClick={handleCreate}>Start</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Flex>
            </ModalBase>
        </MainLayout>
    );
};
