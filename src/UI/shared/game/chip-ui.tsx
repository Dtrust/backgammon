import React from 'react';
import type { ChipModel } from '@/models/Chip.ts';
import type { AnimationDataChip } from '@/store/@types.ts';
import { setChipPosition } from '@/utils';
import { useSocket } from '@/hooks';
import { motion } from 'motion/react';
import { useGame } from '@/store/game.tsx';
import { useMyPlayer } from '@/store/myPlayer.tsx';
import { ChipSvg } from '@/UI/shared/game/svg';

interface IChipProps {
    data: ChipModel;
    animationData?: AnimationDataChip | null;
    setAnimationDataChip?: React.Dispatch<
        React.SetStateAction<AnimationDataChip | null>
    >;
}

export const ChipUI: React.FC<IChipProps> = ({
    data,
    animationData,
    setAnimationDataChip,
}) => {
    const { color, isHighlighted, slotIndex, stackIndex } = data;

    const game = useGame();
    const myPlayer = useMyPlayer();

    const { handleMoveChip, handleToggleChipSelection } = useSocket();

    const { x, y, radius } = setChipPosition(slotIndex, stackIndex);

    const [localPosition, setLocalPosition] = React.useState<{
        x: number;
        y: number;
    }>({ x, y });

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (game?.activePlayerID !== myPlayer?.id) return;
        if (isHighlighted && setAnimationDataChip) {
            handleToggleChipSelection(slotIndex, x, y);
            setAnimationDataChip(
                prev =>
                    ({
                        ...prev,
                        chipID: data.id,
                    }) as Partial<AnimationDataChip> as AnimationDataChip,
            );
        }
    };

    const onCompleteAnimation = () => {
        if (!setAnimationDataChip || !animationData) {
            return;
        }
        setLocalPosition({
            x: animationData.targetX,
            y: animationData.targetY,
        });
        // requestAnimationFrame(() => {
        handleMoveChip(animationData.targetSlotIDX);
        setAnimationDataChip(null);
        // });
    };

    return (
        <motion.g
            aria-label="Chip"
            onClick={e => handleClick(e)}
            initial={{
                x: localPosition.x - radius,
                y: localPosition.y - radius,
            }}
            animate={
                animationData?.chipID === data.id && animationData?.isMoving
                    ? { x: animationData.targetX, y: animationData.targetY }
                    : undefined
            }
            // layoutId={data.id}
            transition={{ duration: 0.5 }}
            onAnimationComplete={onCompleteAnimation}>
            <ChipSvg color={color} radius={radius} />

            {/* Пульсуючий індікатор */}
            {isHighlighted && slotIndex >= 0 && (
                <motion.circle
                    cx={radius}
                    cy={radius}
                    r={radius * 0.5}
                    fill="url(#pulseGrad)"
                    animate={{ r: [radius * 0.4, radius * 0.6, radius * 0.5] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'easeInOut',
                    }}
                />
            )}
        </motion.g>
    );
};
