import React from 'react';
import { GameTypeEnum } from '@/store/@types.ts';
import {
    Button,
    // Card,
    Flex,
    // Text
} from '@radix-ui/themes';
import { useNavigate } from '@tanstack/react-router';
// import styled from 'styled-components';
import { DesktopIcon, GlobeIcon, PersonIcon } from '@radix-ui/react-icons';

interface IGameTypeCardProps {
    gameType: GameTypeEnum;
}

export const GameTypeCard: React.FC<IGameTypeCardProps> = ({ gameType }) => {
    const navigate = useNavigate();

    const handleSelectGameType = () => {
        navigate({
            to: gameType === GameTypeEnum.ONLINE ? '/online' : '/offline',
        });
    };

    return (
        <Button
            onClick={handleSelectGameType}
            aria-describedby={gameType}
            size="4"
            variant="outline">
            {/*<Text as="p" size="4" weight="bold" align="center">*/}
            {/*    {gameType === GameTypeEnum.ONLINE*/}
            {/*        ? 'Online Game'*/}
            {/*        : 'Offline Game'}*/}
            {/*</Text>*/}
            <Flex justify="center" align="center" gap="1">
                <PersonIcon color="gold" />
                {gameType === GameTypeEnum.ONLINE ? (
                    <>
                        <GlobeIcon color="gold" />
                        <PersonIcon color="gold" />
                    </>
                ) : (
                    <DesktopIcon color="gold" />
                )}
            </Flex>
        </Button>
    );
};

// const StyledCard = styled(Card)`
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     gap: 15px;
//     width: 50%;
//     ${({ theme }) => theme.breakpoints.md} {
//         width: 100%;
//     }
//     transition: opacity 0.3s ease-in-out;
//     box-shadow: 9px 10px 8px rgba(0, 0, 0, 0.3);
//     &:hover {
//         opacity: 0.8;
//     }
// `;
