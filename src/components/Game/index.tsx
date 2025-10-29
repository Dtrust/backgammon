import React from 'react';
import type { GameModel } from '@/models/Game.ts';
import { Flex } from '@radix-ui/themes';
import { ControlPanel } from '@/components/ControlPanel';
import { DiceRoller } from '@/components';
import { useSocket } from '@/hooks';
import { BoardUi } from '@/UI';
import styled from 'styled-components';
import {
    CheckColorModal,
    FirstStepContestModal,
    WinnerModal,
} from '@/components/Modals';

interface IGameProps {
    game: GameModel;
}

export const Game: React.FC<IGameProps> = ({ game }) => {
    const {
        handleRollDice,
        useFirstStepContest,
        handleNewGame,
        handleLeaveRoom,
    } = useSocket();

    const players = game.players;

    const isColorNotDecided = players.every(player => player.color === null);

    const isFirstStepDecided = game.firstStepPlayerID;

    const winnerPlayer = players.find(player => !player.chipsRemaining);

    return (
        <Flex direction="column" align="center">
            <ControlPanel
                players={players}
                possibleMovesLength={game.possibleMoves.length}
            />
            <StyledWrapper justify="center">
                {!isFirstStepDecided && !isColorNotDecided ? (
                    <FirstStepContestModal
                        game={game}
                        isModalOpen={!isFirstStepDecided}
                        useFirstStepContest={useFirstStepContest}
                    />
                ) : (
                    <StyledRollerWrapper>
                        <DiceRoller
                            possibleMovesLength={game.possibleMoves.length}
                            rollDices={handleRollDice}
                        />
                    </StyledRollerWrapper>
                )}
                <BoardUi game={game} />
            </StyledWrapper>
            <CheckColorModal isOpen={isColorNotDecided} />
            {winnerPlayer && (
                <WinnerModal
                    isOpen={!!winnerPlayer}
                    winnerPlayer={winnerPlayer}
                    handleNewGame={handleNewGame}
                    handleLeaveRoom={handleLeaveRoom}
                />
            )}
        </Flex>
    );
};

const StyledWrapper = styled(Flex)`
    position: relative;
    width: 100%;
    max-width: 890px;
`;

const StyledRollerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;
