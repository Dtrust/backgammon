import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import { ChipSvg } from '@/UI/shared/game/svg';
import styled from 'styled-components';
import { PlayerAvatar } from '@/UI/shared/player-avatar';
import type { PlayerModel } from '@/models/Player.ts';

interface IPlayerCardProps {
    player: PlayerModel;
    className?: string;
    index: number;
}

export const PlayerCardUI: React.FC<IPlayerCardProps> = ({
    player,
    className,
    index,
}) => {
    if (!player || !player.color) return;
    console.log('player.index', player);
    return (
        <StyledPlayerCard $isActive={player.isActive} className={className}>
            <Flex gap="2" align="center">
                <Flex
                    align="center"
                    gap="4"
                    flexGrow="1"
                    justify={index === 1 ? 'end' : 'start'}>
                    <StyledPlayerAvatar index={index} avatar={player.avatar} />
                    <StyledPlayerName as="p" size="2" index={index}>
                        {player?.name}
                    </StyledPlayerName>
                </Flex>
                <StyledChip index={index} viewBox="0 0 50 50">
                    <ChipSvg color={player.color} radius={25} />
                </StyledChip>
            </Flex>
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
