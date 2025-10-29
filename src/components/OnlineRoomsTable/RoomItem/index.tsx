import React from 'react';
import { type IGameRoom } from '@/hooks/useSocket/@types.ts';
import { Button, Table } from '@radix-ui/themes';
import type { PlayerModel } from '@/models/Player.ts';
import { useSetActiveRoom } from '@/store/myPlayer.tsx';

interface IRoomItemProps {
    room: IGameRoom;
    player: Partial<PlayerModel>;
    handleJoinRoom: (room: IGameRoom) => void;
}

export const RoomItem: React.FC<IRoomItemProps> = ({
    room,
    player,
    handleJoinRoom,
}) => {
    const setActiveRoom = useSetActiveRoom();

    const onJoinRoom = () => {
        handleJoinRoom(room);
        setActiveRoom(room);
    };

    const isMeCreator = room.creatorPlayerID === player.id;

    return (
        <Table.Row
            style={{
                opacity: room.players.length === 2 ? 0.5 : 1,
            }}>
            <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                {room.players[0].name}
            </Table.RowHeaderCell>
            <Table.RowHeaderCell style={{ verticalAlign: 'middle' }}>
                {room.players[1] && room.players[1].name}
            </Table.RowHeaderCell>
            <Table.Cell align="right">
                {room.players.length !== 2 && !isMeCreator ? (
                    <Button size="3" onClick={onJoinRoom}>
                        Join
                    </Button>
                ) : null}
            </Table.Cell>
        </Table.Row>
    );
};
