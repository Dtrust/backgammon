import { createAvatar, type Options, type Style } from '@dicebear/core';
import {
    openPeeps,
    personas,
    adventurer,
    bigEars,
    avataaarsNeutral,
    dylan,
    funEmoji,
    avataaars,
} from '@dicebear/collection';

export const generateAvatar = (): string => {
    const size = 100;

    const collections: Style<Options>[] = [
        openPeeps,
        personas,
        adventurer,
        bigEars,
        avataaarsNeutral,
        dylan,
        funEmoji,
        avataaars,
    ];

    const randomIndex = Math.floor(Math.random() * collections.length);

    const seed = Math.random().toString(36).substring(2, 8);

    const avatar = createAvatar(collections[randomIndex], {
        seed,
        size,
    });

    return avatar.toDataUri();
};
