import React from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useMyPlayer } from '@/store/myPlayer.tsx';
import { CreateMyPlayerModal } from '@/components/Modals';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

const App: React.FC = () => {
    const myPlayer = useMyPlayer();
    return (
        <>
            {!myPlayer!.id && <CreateMyPlayerModal />}
            <RouterProvider router={router} />
        </>
    );
};

export default App;
