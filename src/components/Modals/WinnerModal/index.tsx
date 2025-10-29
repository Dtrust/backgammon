import React from 'react';
import { ModalBase } from '@/UI';
import type { PlayerModel } from '@/models/Player.ts';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useResetActiveRoom } from '@/store/myPlayer.tsx';
import { useResetGame } from '@/store/game.tsx';
import { useNavigate } from '@tanstack/react-router';

interface IWinnerModalProps {
    isOpen: boolean;
    winnerPlayer: PlayerModel;
    handleNewGame: () => void;
    handleLeaveRoom: () => void;
}

export const WinnerModal: React.FC<IWinnerModalProps> = ({
    isOpen,
    winnerPlayer,
    handleNewGame,
    handleLeaveRoom,
}) => {
    const resetActiveRoom = useResetActiveRoom();
    const resetGame = useResetGame();

    const navigate = useNavigate();

    const handleCancel = () => {
        handleLeaveRoom();
        resetGame();
        resetActiveRoom();
        navigate({ to: '/' });
    };

    return (
        <ModalBase isOpen={isOpen} title="Winner" align="center">
            <Text as="p" align="center" my="2">
                <Text as="span" weight="bold" color={'gold'}>
                    {winnerPlayer.name}
                </Text>{' '}
                Win the game!
            </Text>
            <Flex justify="center" align="center" gap="2">
                <Button onClick={handleNewGame}>New Game</Button>
                <Button onClick={handleCancel}>Close</Button>
            </Flex>
        </ModalBase>
    );
};
