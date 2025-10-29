import React from 'react';
import { Flex } from '@radix-ui/themes';
import type { PlayerModel } from '@/models/Player.ts';
import { Dices } from '@/components/Dices';
import type { GameModel } from '@/models/Game.ts';
import { PlayerCardUI } from '@/UI';
import styled from 'styled-components';

interface IControlPanelProps {
    players: PlayerModel[];
    possibleMovesLength?: GameModel['possibleMoves']['length'];
}

export const ControlPanel: React.FC<IControlPanelProps> = ({
    players,
    possibleMovesLength,
}) => {
    const playerValues =
        players.find(player => player.isActive)?.dices.values || [];

    return (
        <StyledControlPanel py="2" gap="1">
            {players.map((player, index) => (
                <StyledPlayerCardUI
                    key={player.id}
                    index={index}
                    player={player}
                />
            ))}
            <Dices
                playerValues={playerValues}
                possibleMovesLength={possibleMovesLength}
            />
        </StyledControlPanel>
    );
};

const StyledControlPanel = styled(Flex)`
    width: 100%;
    max-width: 890px;
    justify-content: space-between;
    min-height: 100px;
`;

const StyledPlayerCardUI = styled(PlayerCardUI)<{ index: number }>`
    order: ${({ index }) => index};
`;
