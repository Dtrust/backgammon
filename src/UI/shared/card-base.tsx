import React from 'react';
import styled from 'styled-components';
import { Card } from '@radix-ui/themes';

interface ICardBaseProps {
    children: React.ReactNode;
    className?: string;
}

export const CardBase: React.FC<ICardBaseProps> = ({ children, className }) => {
    return <StyledCardBase className={className}>{children}</StyledCardBase>;
};

const StyledCardBase = styled(Card)`
    box-shadow: 9px 10px 8px rgba(0, 0, 0, 0.3);
`;
