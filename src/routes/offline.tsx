import { createFileRoute } from '@tanstack/react-router';
import { OfflineGamePage } from '@/pages';

export const Route = createFileRoute('/offline')({
    component: OfflineGamePage,
});
