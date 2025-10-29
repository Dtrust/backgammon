import React from 'react';
import { useGame } from '@/store/game.tsx';
import {
    // GameTypeEnum,
    type PlayerColorEnum,
} from '@/store/@types.ts';
import { ModalBase } from '@/UI';
import { Button, Flex, Spinner, Text } from '@radix-ui/themes';
import { useMyPlayer } from '@/store/myPlayer.tsx';
import { useSocket } from '@/hooks';
import { ChipSvg } from '@/UI/shared/game/svg';

interface ICheckColorModalProps {
    isOpen: boolean;
}

export const CheckColorModal: React.FC<ICheckColorModalProps> = ({
    isOpen,
}) => {
    const { handleChooseColor } = useSocket();

    const game = useGame();
    const myPlayer = useMyPlayer();

    const [selectedColor, setSelectedColor] = React.useState<
        { id: number; color: PlayerColorEnum } | undefined
    >(undefined);

    if (!game || !myPlayer) {
        console.error('Game or player is not defined in CheckColorModal');
        return null;
    }

    const possibleColors = game.possibleColors;

    const isSecondPlayer =
        // game.type !== GameTypeEnum.OFFLINE &&
        myPlayer!.id === game.players[0].id;

    //
    const handleColorSelect = (id: number) => {
        if (possibleColors) {
            setSelectedColor(possibleColors.find(color => color.id === id));
        }
    };
    //
    const handleConfirm = () => {
        if (!myPlayer.id || !selectedColor) {
            return;
        }
        handleChooseColor(selectedColor.color);
    };

    return (
        <ModalBase isOpen={isOpen} title="Choose color" maxWidth="300px">
            {isSecondPlayer ? (
                <Flex direction={'column'}>
                    <Flex mb="4" gap="4" justify="center">
                        {possibleColors?.length &&
                            possibleColors.map(color => (
                                <Flex
                                    align="center"
                                    justify="center"
                                    key={color.id}
                                    onClick={() => handleColorSelect(color.id)}
                                    width="53px"
                                    height="53px"
                                    style={{
                                        cursor: 'pointer',
                                        border: '2px solid',
                                        borderColor:
                                            selectedColor?.id === color.id
                                                ? 'var(--blue-8)'
                                                : 'var(--gray-10)',
                                        borderRadius: '53px',
                                    }}>
                                    <svg
                                        width={45}
                                        height={45}
                                        viewBox="0 0 50 50">
                                        <ChipSvg
                                            color={color.color}
                                            radius={25}
                                        />
                                    </svg>
                                </Flex>
                            ))}
                    </Flex>
                    <Button
                        size="4"
                        disabled={!selectedColor}
                        onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Flex>
            ) : (
                <Flex direction={'column'} justify="center" align="center">
                    <Text as="p" align="center">
                        <Text
                            as="span"
                            style={{ color: 'var(--blue-12)' }}
                            weight="bold">
                            {game!.players[0].name}
                        </Text>{' '}
                        chooses a color
                    </Text>
                    <Spinner size="3" />
                </Flex>
            )}
        </ModalBase>
    );
};
