import React from 'react';
import { CardBase, Logo, MainLayout } from '@/UI';
import { Button, Flex, Heading, VisuallyHidden, Text } from '@radix-ui/themes';
import { useMyPlayer } from '@/store/myPlayer.tsx';
import { GameTypeEnum } from '@/store/@types.ts';
import styled from 'styled-components';
import { RulesModal } from '@/components/Modals';
import { MyPlayerCard } from '@/components/MyPlayerCard';
import { GameTypeCard } from '@/components/GameTypeCard';

export const HomePage: React.FC = () => {
    const myPlayer = useMyPlayer();

    const [rulesModalOpen, setRulesModalOpen] = React.useState<boolean>(false);

    const openRulesModal = () => {
        setRulesModalOpen(prev => !prev);
    };

    const closeRulesModal = () => {
        setRulesModalOpen(prev => !prev);
    };

    return (
        <MainLayout>
            <VisuallyHidden>
                <Heading size="9" weight="bold" align="center">
                    Backgammon Six One
                </Heading>
            </VisuallyHidden>
            <Flex justify="center" align="center">
                <Logo />
            </Flex>
            {myPlayer && myPlayer.id !== '' ? (
                <Flex justify="center" align="center">
                    <MyPlayerCard />
                </Flex>
            ) : null}
            <Flex justify="center" align="center">
                <StyleCardWrapper>
                    <Text as="p" align="center" my="2" weight="bold">
                        Select Game Type
                    </Text>
                    <Flex justify="center" align="center" gap="4">
                        <GameTypeCard gameType={GameTypeEnum.ONLINE} />
                        <GameTypeCard gameType={GameTypeEnum.OFFLINE} />
                    </Flex>
                </StyleCardWrapper>
            </Flex>
            <Flex justify="center" align="center">
                <Button onClick={openRulesModal} size="4">
                    Read Rules
                </Button>
            </Flex>
            <RulesModal isOpen={rulesModalOpen} onClose={closeRulesModal} />
        </MainLayout>
    );
};

const StyleCardWrapper = styled(CardBase)`
    justify-content: center;
    margin: 2rem 0; 
    align-items: center;
    ${({ theme }) => theme.breakpoints.md} {
        flex-direction: column;
    }
    width: 50%;
    ${({ theme }) => theme.breakpoints.md} {
        width: 100%;
    }
}
`;
