import React from 'react';
import { Container, Section } from '@radix-ui/themes';
import { Footer } from '@/UI';

interface IMainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    return (
        <Container px="3" minHeight="100vh">
            <Section minHeight="90vh" p={'2'}>
                {children}
            </Section>
            <Footer />
        </Container>
    );
};
