import React from 'react';
import { ModalBase } from '@/UI';
import {
    Button,
    Flex,
    Heading,
    ScrollArea,
    Strong,
    Text,
} from '@radix-ui/themes';

interface IRulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RulesModal: React.FC<IRulesModalProps> = ({ isOpen, onClose }) => {
    return (
        <ModalBase
            isOpen={isOpen}
            title="🎲 Game Rules — Backgammon Six One"
            align="center">
            <ScrollArea style={{ height: '50vh' }}>
                <Heading size="4" mt="3">
                    Objective
                </Heading>
                <Text as="p" mb="3">
                    Move all your checkers into your home board and bear them
                    off before your opponent does.
                </Text>

                <Heading size="4" mt="3">
                    1. Starting the Game
                </Heading>
                <Text as="p" mb="3">
                    Each player begins with all checkers placed in their
                    starting slot. The first move is determined by rolling one
                    die each — the player with the higher number starts the game
                    using those dice.
                </Text>

                <Heading size="4" mt="3">
                    2. Movement
                </Heading>
                <Text as="p" mb="3">
                    Players move their checkers in opposite directions along the
                    board according to the numbers rolled on the dice. A checker
                    can move only to an open point — that is, a point not
                    occupied by two or more opposing checkers.
                </Text>
                <Text as="p" mb="3">
                    Both dice must be used if possible; each die represents a
                    separate move.
                </Text>

                <Heading size="4" mt="3">
                    3. Doubles
                </Heading>
                <Text as="p" mb="3">
                    When a player rolls <Strong>doubles</Strong> (e.g., 3–3,
                    4–4), they play four moves instead of two — each with the
                    number shown on the dice.
                </Text>
                <Text as="p" mb="3">
                    If the player's starting slot contains checkers and the
                    corresponding home slots are open, the player may
                    <Strong>
                        enter up to four checkers directly into their home board
                    </Strong>{' '}
                    from the starting slot.
                </Text>
                <Text as="p" mb="3">
                    Example: rolling <Strong>3–3</Strong> allows the player to
                    move four checkers into their home slot 9 (for white) or
                    home slot 21 (for black), if those slots are open.
                </Text>
                <Text as="p" mb="3">
                    After completing all four moves, the player{' '}
                    <Strong>rolls again</Strong> and takes another turn.
                </Text>

                <Heading size="4" mt="3">
                    4. Special Combination — “6–1”
                </Heading>
                <Text as="p" mb="3">
                    When a player rolls <Strong>6–1</Strong>, they can bring two
                    checkers from the starting slot directly into the home
                    board:
                </Text>
                <Text as="p" mb="2">
                    • One checker to home slot 6 and the other to home slot 11 (
                    <Strong>for white</Strong>)<br />• One checker to home slot
                    18 and the other to home slot 23 (<Strong>for black</Strong>
                    )
                </Text>
                <Text as="p" mb="3">
                    The player also receives <Strong>an extra turn</Strong>{' '}
                    after completing these moves.
                </Text>

                <Heading size="4" mt="3">
                    5. Extra Turns
                </Heading>
                <Text as="p" mb="3">
                    A player who rolls any <Strong>double</Strong> or the{' '}
                    <Strong>6–1</Strong> combination is granted an additional
                    roll after completing their moves.
                </Text>
                <Text as="p" mb="3">
                    The player continues to roll and move until they roll a
                    non-special combination.
                </Text>

                <Heading size="4" mt="3">
                    6. Bearing Off
                </Heading>
                <Text as="p" mb="3">
                    Once all of a player’s checkers are in their home board,
                    they may start bearing them off. A checker can be borne off
                    the board by rolling a number corresponding to the point it
                    occupies.
                </Text>
                <Text as="p">
                    The first player to bear off all their checkers wins the
                    game.
                </Text>
            </ScrollArea>
            <Flex my="2" justify="center" align="center">
                <Button onClick={onClose}>Close</Button>
            </Flex>
        </ModalBase>
    );
};
