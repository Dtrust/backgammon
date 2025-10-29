import React from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import { CardBase, PlayerAvatar } from '@/UI';
import { CreateMyPlayerModal } from '../Modals/CreateMyPlayerModal';
import { useMyPlayer } from '@/store/myPlayer.tsx';
import styled from 'styled-components';

export const MyPlayerCard: React.FC = () => {
    const myPlayer = useMyPlayer();

    const [updatePlayerModal, setUpdatePlayerModal] =
        React.useState<boolean>(false);

    const openUpdatePlayerModal = () => {
        setUpdatePlayerModal(true);
    };

    if (!myPlayer) {
        return null;
    }

    return (
        <>
            <StyledCardBase>
                <Text as="p" align="center" my="2" weight="bold">
                    My Player
                </Text>
                <Flex align="center" justify="between" gap="1" px="8">
                    <Flex direction="column" gap="1">
                        <PlayerAvatar avatar={myPlayer.avatar as string} />
                        <Text as="p">{myPlayer.name}</Text>
                    </Flex>
                    <Button onClick={openUpdatePlayerModal}>
                        Update Player
                    </Button>
                </Flex>
            </StyledCardBase>
            {updatePlayerModal && (
                <CreateMyPlayerModal
                    isUpdate
                    externalIsModalOpen={setUpdatePlayerModal}
                />
            )}
        </>
    );
};

const StyledCardBase = styled(CardBase)`
    width: 50%;
    ${({ theme }) => theme.breakpoints.md} {
        width: 100%;
    }
`;
