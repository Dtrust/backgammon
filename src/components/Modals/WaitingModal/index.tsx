import React from 'react';
import { ModalBase } from '@/UI';
import { Button, Flex, Spinner, Text } from '@radix-ui/themes';
import {
    useActiveRoom,
    useMyPlayer,
    useResetActiveRoom,
} from '@/store/myPlayer.tsx';
import type { PlayerModel } from '@/models/Player.ts';

interface IWaitingModalProps {
    isWaitModalOpen: boolean;
    handleDeleteRoom: () => void;
    handleUnJoinRoom: (roomID: string, playerID: PlayerModel['id']) => void;
}

export const WaitingModal: React.FC<IWaitingModalProps> = ({
    isWaitModalOpen,
    handleDeleteRoom,
    handleUnJoinRoom,
}) => {
    const myPlayer = useMyPlayer();

    const room = useActiveRoom();
    const resetActiveRoom = useResetActiveRoom();

    if (!myPlayer || !room) {
        return null;
    }

    const isMeCreator = room.creatorPlayerID === myPlayer.id;

    const handleCancel = () => {
        if (isMeCreator && room) {
            handleDeleteRoom();
        }
        if (!isMeCreator && room.id) {
            handleUnJoinRoom(room.id, myPlayer.id!);
        }
        resetActiveRoom();
    };

    return (
        <ModalBase
            isOpen={isWaitModalOpen}
            title={
                room.players.length < 2 && isMeCreator
                    ? 'Waiting for player'
                    : 'Game creating...'
            }
            maxWidth={'300px'}>
            <Flex justify="center" minHeight="20px" mb="2">
                {room.players.length === 2 && (
                    <Text as="p">
                        <Text style={{ color: 'var(--blue-12)' }} weight="bold">
                            {isMeCreator
                                ? room.players[1].name
                                : room.players[0].name}
                        </Text>
                        {isMeCreator ? ` is joining` : ` waiting for you`}
                    </Text>
                )}
            </Flex>
            <Flex justify="center">
                <Spinner size="3" />
            </Flex>
            <Flex justify="center" my="2">
                {room.players.length < 2 && (
                    <Button onClick={handleCancel}>Cancel</Button>
                )}
            </Flex>
        </ModalBase>
    );
};
