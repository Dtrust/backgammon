import React from 'react';
import { type GameModel } from '@/models/Game.ts';
import type { AnimationDataChip } from '@/store/@types.ts';
import { BoardSvg } from '@/UI/shared/game/svg';
import { SlotUI } from './slot-ui';
import { ChipUI } from '@/UI/shared/game/chip-ui.tsx';
import type { PlayerModel } from '@/models/Player.ts';

interface IBoardProps {
    game?: GameModel;
}

export const BoardUi: React.FC<IBoardProps> = ({ game }) => {
    const [animationDataChip, setAnimationDataChip] =
        React.useState<AnimationDataChip | null>(null);

    return (
        <BoardSvg>
            {game?.slots.map(slot => (
                <SlotUI
                    key={slot.id}
                    data={slot}
                    setAnimationDataChip={setAnimationDataChip}
                />
            ))}
            {game?.players.map((player: PlayerModel) => (
                <SlotUI
                    key={player.id}
                    data={player.bearOffSlot || undefined}
                    isBearOffSlot
                    setAnimationDataChip={setAnimationDataChip}
                />
            ))}
            {/* draw chips by slots */}
            {game?.slots.length &&
                game.slots.map(slot =>
                    slot.chips.map((chip, stackIndex) => (
                        <ChipUI
                            key={`${chip.color}-${chip.slotIndex}-${stackIndex}`}
                            data={chip}
                            animationData={animationDataChip}
                            setAnimationDataChip={setAnimationDataChip}
                        />
                    )),
                )}
            {/* draw chips in bearOff slots */}
            {game?.players.length &&
                game.players.map(player =>
                    player.bearOffSlot?.chips.map(chip => (
                        <ChipUI key={chip.id} data={chip} />
                    )),
                )}
        </BoardSvg>
    );
};
