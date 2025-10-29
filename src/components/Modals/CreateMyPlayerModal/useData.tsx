import React from 'react';
import type { PlayerModel } from '@/models/Player.ts';
import { generateAvatar } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { useMyPlayer, useUpdateMyPlayer } from '@/store/myPlayer.tsx';

type UseCreateMyPlayerModalDataProps = (
    externalIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    isUpdate?: boolean,
) => {
    isModalOpen: boolean;
    player: Partial<PlayerModel>;
    handlePlayerNameChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    handleMakeAvatar: () => void;
    handleCreatePlayer: () => void;
    setIsModalOpen: (open: boolean) => void;
    disabled: boolean;
};

export const useCreateMyPlayerModalData: UseCreateMyPlayerModalDataProps = (
    externalIsModalOpen,
    isUpdate,
) => {
    const myPlayer = useMyPlayer();

    const setMyPlayer = useUpdateMyPlayer();

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);

    const [localPlayer, setLocalPlayer] = React.useState<Partial<PlayerModel>>({
        id: '',
        name: '',
        avatar: '',
    });

    const [disabled, setDisabled] = React.useState<boolean>(true);

    const handlePlayerNameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setLocalPlayer(prev => ({ ...prev, name: event.target.value }));
    };

    const handleMakeAvatar = () => {
        const avatar: string = generateAvatar();
        setLocalPlayer(prev => ({ ...prev, avatar: avatar }));
    };

    const handleCreatePlayer = () => {
        const newPlayer = {
            id: isUpdate ? myPlayer?.id : uuidv4(),
            name: localPlayer.name,
            avatar: localPlayer.avatar,
        };
        setMyPlayer(newPlayer);
        setIsModalOpen(false);
        if (externalIsModalOpen) {
            externalIsModalOpen(false);
        }
    };

    React.useEffect(() => {
        setLocalPlayer(myPlayer!);
    }, [myPlayer]);

    React.useEffect(() => {
        if (localPlayer.name && localPlayer.avatar) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

        if (
            isUpdate &&
            myPlayer!.name === localPlayer.name &&
            myPlayer!.avatar === localPlayer.avatar
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [localPlayer]);

    return {
        isModalOpen,
        player: localPlayer,
        handlePlayerNameChange,
        handleMakeAvatar,
        handleCreatePlayer,
        setIsModalOpen,
        disabled,
    };
};
