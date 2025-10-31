/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Backgammon Six One',
                short_name: 'Six One',
                description: 'Play online backgammon directly in your browser!',
                theme_color: '#3a3948',
                background_color: '#3a3948',
                display: 'standalone',
                start_url: '/',
                lang: 'en-EN',
                icons: [
                    {
                        src: '/web-app-manifest-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/web-app-manifest-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // This maps '@' to your 'src' directory
        },
    },
});
