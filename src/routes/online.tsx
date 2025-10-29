import { createFileRoute } from '@tanstack/react-router';
import { OnlineGamePage } from '@/pages';

export const Route = createFileRoute('/online')({
    component: OnlineGamePage,
});
