import React from 'react';
import { Badge, Flex } from '@radix-ui/themes';
import { useGameStarted } from '@/store/game.tsx';
import { useRoomTimer } from '@/store/myPlayer.tsx';
import { DiceSvg } from '@/UI';

interface IDicesProps {
    possibleMovesLength?: number;
    playerValues: number[];
}

export const Dices: React.FC<IDicesProps> = ({
    playerValues,
    possibleMovesLength,
}) => {
    const timer = useRoomTimer();
    const isGameStarted = useGameStarted();

    return (
        <Flex
            gap="2"
            align="center"
            justify="center"
            style={{ position: 'relative' }}>
            {playerValues[0] && <DiceSvg value={playerValues[0]} size={50} />}
            {playerValues[1] && <DiceSvg value={playerValues[1]} size={50} />}
            {isGameStarted &&
            possibleMovesLength === 0 &&
            timer &&
            timer > 0 ? (
                <Badge
                    size="3"
                    variant="solid"
                    color="red"
                    style={{
                        position: 'absolute',
                        bottom: -5,
                    }}>
                    No possible moves
                </Badge>
            ) : null}
        </Flex>
    );
};
