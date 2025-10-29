import React from 'react';
import { type GameModel } from '@/models/Game.ts';
import { Button } from '@radix-ui/themes';
import { useMyPlayer } from '@/store/myPlayer.tsx';
import { useGame } from '@/store/game.tsx';

interface IDiceRollerProps {
    possibleMovesLength?: GameModel['possibleMoves']['length'];
    rollDices: () => void;
    isDisabled?: boolean;
}

export const DiceRoller: React.FC<IDiceRollerProps> = ({
    possibleMovesLength,
    rollDices,
    isDisabled,
}) => {
    const myPlayer = useMyPlayer();
    const game = useGame();

    const activePlayer = game?.players.find(player => player.isActive);

    const disabled = isDisabled;

    const handleRoll = () => {
        if (!disabled) {
            rollDices();
        }
    };

    return (
        <>
            {(activePlayer && myPlayer!.id === activePlayer.id) ||
            !game?.isGameStarted ? (
                <div>
                    {!game!.isGameStarted ? (
                        <Button onClick={handleRoll} disabled={disabled}>
                            Roll Dice
                        </Button>
                    ) : (
                        <>
                            {possibleMovesLength === 0 && (
                                <Button
                                    size="4"
                                    onClick={handleRoll}
                                    disabled={disabled}>
                                    🎲 Roll Dice
                                </Button>
                            )}
                        </>
                    )}
                </div>
            ) : null}
        </>
    );
};
