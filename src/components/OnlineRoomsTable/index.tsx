import React from 'react';
import { Card, ScrollArea, Table, Text, Flex, Heading } from '@radix-ui/themes';
import { type IGameRoom } from '@/hooks/useSocket/@types.ts';
import { useMyPlayer, useSetActiveRoom } from '@/store/myPlayer.tsx';
import type { PlayerModel } from '@/models/Player.ts';
import { RoomItem } from '@/components/OnlineRoomsTable/RoomItem';
import styled from 'styled-components';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface IRoomsTableProps {
    rooms: IGameRoom[];
    handleJoinRoom: (roomID: string, player: Partial<PlayerModel>) => void;
}

export const RoomsTable: React.FC<IRoomsTableProps> = ({
    rooms,
    handleJoinRoom,
}) => {
    const myPlayer = useMyPlayer();
    const setActiveRoom = useSetActiveRoom();

    if (!myPlayer) {
        console.error('Player is not defined in RoomsTable');
        return null;
    }

    const handleJoin = (room: IGameRoom) => {
        handleJoinRoom(room.id, myPlayer);
        setActiveRoom(room);
    };

    return (
        <>
            <Heading>Online games</Heading>
            <StyledCard>
                {rooms.length > 0 && (
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell align="left">
                                    Game Creator
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell align="left">
                                    Opponent
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell
                                    align="right"
                                    style={{ width: '40%' }}
                                />
                            </Table.Row>
                        </Table.Header>
                    </Table.Root>
                )}
                <ScrollArea style={{ height: '40vh' }}>
                    {rooms.length > 0 ? (
                        <Table.Root size="1">
                            <Table.Body>
                                {rooms.map(room => (
                                    <RoomItem
                                        key={room.id}
                                        room={room}
                                        player={myPlayer}
                                        handleJoinRoom={handleJoin}
                                    />
                                ))}
                            </Table.Body>
                        </Table.Root>
                    ) : (
                        <Flex
                            justify="center"
                            align="center"
                            direction={'column'}
                            style={{ height: '40vh' }}>
                            <InfoCircledIcon
                                width="25"
                                height="25"
                                color="yellow"
                            />
                            <Text size="4">No active players yet</Text>
                        </Flex>
                    )}
                </ScrollArea>
            </StyledCard>
        </>
    );
};

const StyledCard = styled(Card)`
    margin: 20px 0;
`;
