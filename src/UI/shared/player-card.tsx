import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import { ChipSvg } from '@/UI/shared/game/svg';
import styled from 'styled-components';
import { PlayerAvatar } from '@/UI/shared/player-avatar';
import type { PlayerModel } from '@/models/Player.ts';

interface IPlayerCardProps {
    player: PlayerModel;
    className?: string;
}

export const PlayerCardUI: React.FC<IPlayerCardProps> = ({
    player,
    className,
}) => {
    if (!player || !player.color) return;

    return (
        <StyledPlayerCard $isActive={player.isActive} className={className}>
            <Flex gap="2" align="center">
                <Flex align="center" direction="column" gap="1">
                    <StyledPlayerAvatar
                        index={player.playerIndex}
                        avatar={player.avatar}
                    />
                </Flex>
                <StyledPlayerName as="p" size="2" index={player.playerIndex}>
                    {player?.name}
                </StyledPlayerName>
                <StyledChip index={player.playerIndex} viewBox="0 0 50 50">
                    <ChipSvg color={player.color} radius={20} />
                </StyledChip>
            </Flex>
            {/*<Modal isOpen={isModalOpen}>*/}
            {/*    <div>*/}
            {/*        Player <span style={{ color: 'red' }}>{player?.name}</span>{' '}*/}
            {/*        has won the game!*/}
            {/*    </div>*/}
            {/*    <button onClick={handleNewGame}>New Game</button>*/}
            {/*</Modal>*/}
        </StyledPlayerCard>
    );
};

const StyledPlayerCard = styled(Card)<{ $isActive: boolean }>`
    width: 30%;
    border: 3px solid ${({ $isActive }) => ($isActive ? 'green' : 'gray')};
`;

const StyledPlayerAvatar = styled(PlayerAvatar)<{ index: number }>`
    transform: ${({ index }) =>
        index === 1 ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const StyledPlayerName = styled(Text)<{ index: number }>`
    width: 50%;
    text-align: ${({ index }) => (index === 1 ? 'right' : 'left')};
    text-wrap: wrap;
    order: ${({ index }) => (index === 1 ? '-1' : '0')};
    font-weight: bold;
`;

const StyledChip = styled.svg<{ index: number }>`
    width: 35px;
    height: 35px;
    order: ${({ index }) => (index === 1 ? '-2' : '0')};
`;
