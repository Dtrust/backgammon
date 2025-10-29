import React from 'react';
import { Dialog } from '@radix-ui/themes';
import type { PxSize } from '@/UI/@types.ts';

interface IModalProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    children: React.ReactNode;
    maxWidth?: PxSize;
    align?: 'center' | 'left' | 'right';
}

export const ModalBase: React.FC<IModalProps> = ({
    isOpen,
    title,
    description,
    children,
    maxWidth,
    align = 'center',
}) => {
    return (
        <Dialog.Root open={isOpen}>
            <Dialog.Content
                maxWidth={maxWidth}
                aria-describedby={!description ? undefined : description}>
                {title && (
                    <Dialog.Title as={'h4'} align={align}>
                        {title}
                    </Dialog.Title>
                )}
                {description && (
                    <Dialog.Description align={align}>
                        {description}
                    </Dialog.Description>
                )}
                {children}
            </Dialog.Content>
        </Dialog.Root>
    );
};
