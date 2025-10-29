import React from 'react';
import Image from '../../assets/logo.png';
import styled from 'styled-components';

export const Logo: React.FC = () => {
    return <StyledLogo src={Image} alt="logo" />;
};

const StyledLogo = styled.img`
    max-width: 300px;
`;
