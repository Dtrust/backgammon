import React from 'react';
import { Avatar } from '@radix-ui/themes';

interface IPlayerAvatarProps {
    avatar: string;
}

export const PlayerAvatar: React.FC<IPlayerAvatarProps> = ({ avatar }) => {
    return (
        <Avatar
            style={{ borderRadius: '50%', backgroundColor: 'var(--gray-11)' }}
            size="5"
            src={avatar}
            fallback={avatar}
        />
    );
};
