import React from 'react';
import { Theme as RadixTheme } from '@radix-ui/themes';
import { ThemeProvider as StyledProvider } from 'styled-components';
import './global.css';

interface IThemeProviderProps {
    children: React.ReactNode;
}

const breakpoints = {
    sm: '@media (max-width: 480px)',
    md: '@media (max-width: 768px)',
    lg: '@media (max-width: 1200px)',
};

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    return (
        <StyledProvider theme={{ breakpoints }}>
            <RadixTheme
                appearance="dark"
                accentColor="blue"
                grayColor="gray"
                radius="medium"
                scaling="100%"
                style={{
                    background:
                        'linear-gradient(to bottom, var(--blue-5) -134%, transparent)',
                }}>
                {children}
            </RadixTheme>
        </StyledProvider>
    );
};
