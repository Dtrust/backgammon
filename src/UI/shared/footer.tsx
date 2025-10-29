import React from 'react';
import { Flex, Link, Text } from '@radix-ui/themes';

export const Footer: React.FC = () => {
    return (
        <footer>
            <Flex align="center" justify="center">
                <Text as="p">
                    Created by&nbsp;
                    <Link href={'https://dovziy.com/'} target="_blank">
                        <Text as="span">Dennis Dovziy</Text>
                    </Link>
                </Text>
            </Flex>
        </footer>
    );
};
