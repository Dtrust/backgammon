import React from 'react';
import { ModalBase, PlayerAvatar } from '@/UI';
import { Button, Flex, TextField } from '@radix-ui/themes';
import { useCreateMyPlayerModalData } from '@/components/Modals/CreateMyPlayerModal/useData.tsx';
import styled from 'styled-components';
import { Cross1Icon } from '@radix-ui/react-icons';

interface ICreateMyPlayerModalProps {
    externalIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isUpdate?: boolean;
}

export const CreateMyPlayerModal: React.FC<ICreateMyPlayerModalProps> = ({
    externalIsModalOpen,
    isUpdate,
}) => {
    const {
        isModalOpen,
        player,
        handlePlayerNameChange,
        handleMakeAvatar,
        handleCreatePlayer,
        disabled,
    } = useCreateMyPlayerModalData(externalIsModalOpen, isUpdate);

    return (
        <StyledModal
            isOpen={isModalOpen}
            title={isUpdate ? 'Update Player' : 'Create Player'}
            maxWidth={'300px'}>
            {isUpdate && (
                <StyledCloseButton
                    variant="ghost"
                    onClick={() => externalIsModalOpen!(false)}>
                    <Cross1Icon />
                </StyledCloseButton>
            )}
            <Flex align="center" gap="4" m="4" direction="column">
                <PlayerAvatar avatar={player.avatar as string} />
                <Button
                    onClick={handleMakeAvatar}
                    aria-describedby="make-avatar">
                    {!player.avatar ? 'Make avatar' : 'Change avatar'}
                </Button>
            </Flex>
            <Flex>
                <TextField.Root
                    style={{ width: '100%' }}
                    name="playerName"
                    placeholder="Player name"
                    value={player.name}
                    onChange={handlePlayerNameChange}
                />
            </Flex>
            <Flex m="4" justify="center">
                <Button
                    disabled={disabled}
                    size="4"
                    onClick={handleCreatePlayer}>
                    {isUpdate ? 'Update Player' : 'Create Player'}
                </Button>
            </Flex>
        </StyledModal>
    );
};

const StyledModal = styled(ModalBase)`
    position: relative;
`;

const StyledCloseButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
`;
