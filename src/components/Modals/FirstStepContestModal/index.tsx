import React from 'react';
import { ModalBase, PlayerCardUI } from '@/UI';
import { Flex, Text } from '@radix-ui/themes';
import { DiceRoller } from '@/components';
import { Dices } from '@/components/Dices';
import { useRoomTimer } from '@/store/myPlayer.tsx';
import styled from 'styled-components';
import type { GameModel } from '@/models/Game.ts';

interface IFirstStepContestModalProps {
    game: GameModel;
    isModalOpen: boolean;
    useFirstStepContest: () => void;
}

export const FirstStepContestModal: React.FC<IFirstStepContestModalProps> = ({
    game,
    isModalOpen,
    useFirstStepContest,
}) => {
    const timer = useRoomTimer();

    const players = game.players;
    const contestResult = game.firstStepContestData;

    const value1 = contestResult[0]?.value;
    const value2 = contestResult[1]?.value;

    const isWinnerDecided = value1 && value2 && value1 !== value2;

    const isDraw = value1 && value2 && value1 === value2;

    const winnerName = value1 > value2 ? players[0].name : players[1].name;

    const resultText = React.useMemo(() => {
        if (!isWinnerDecided && !isDraw) return '';
        const timerText = timer !== null ? `${timer} seconds` : '';
        return isDraw
            ? `Repeat roll after: ${timerText}`
            : `First step winner is ${winnerName}. Game will start after: ${timerText}`;
    }, [isDraw, isWinnerDecided, timer, winnerName]);

    if (!game) {
        console.error('Game is not defined in FirstStepContestModal');
        return null;
    }

    return (
        <ModalBase
            isOpen={isModalOpen}
            title="First step contest"
            align="center"
            maxWidth={'700px'}>
            <StyledTextWrapper justify="center" align="center">
                {isWinnerDecided || isDraw ? (
                    <>
                        {resultText && (
                            <Text as="p" size="3" align="center">
                                {resultText}
                            </Text>
                        )}
                    </>
                ) : null}
            </StyledTextWrapper>
            <Flex gap="2">
                {players.map((player, index) => (
                    <StyledPlayerCardUI
                        key={player.id}
                        index={index}
                        playersLength={players.length}
                        player={player}
                    />
                ))}
                <StyledDiceRollerWrapper>
                    <StyledDicesWrapper gap="2">
                        <Dices playerValues={[value1, value2]} />
                    </StyledDicesWrapper>
                    <DiceRoller
                        rollDices={useFirstStepContest}
                        isDisabled={isWinnerDecided || Boolean(isDraw)}
                    />
                </StyledDiceRollerWrapper>
            </Flex>
        </ModalBase>
    );
};

const StyledTextWrapper = styled(Flex)`
    min-height: 30px;
`;

const StyledPlayerCardUI = styled(PlayerCardUI)<{
    index: number;
    playersLength: number;
}>`
    order: ${({ index, playersLength }) =>
        index === playersLength - 1 ? '3' : '0'};
`;

const StyledDiceRollerWrapper = styled(Flex)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledDicesWrapper = styled(Flex)`
    min-height: 80px;
`;
