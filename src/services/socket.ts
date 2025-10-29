import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const socket: Socket = io(SERVER_URL, {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});
