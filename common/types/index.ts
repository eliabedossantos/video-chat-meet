import { Socket as NetSocket } from 'net';
import { Server as HTTPServer } from 'http';
import { NextApiResponse } from 'next/types';
import { Server as SocketIOServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Socket as ClientSocket } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { Dispatch, SetStateAction } from 'react';

// Definindo os tipos
export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};

export type TSocket = ClientSocket<DefaultEventsMap, DefaultEventsMap>;

export type KeyValue<T> = Record<string, T>;
export type Nullable<T> = T | null;

// Novo tipo User sem a dependência do Auth0
export type User = {
  id: string;
  name: string;
  picture: string;
};

export type ZtalkContextType = {
  socket: TSocket;
  roomId: RoomId;
  peer: Peer;
  user: User;  // Agora substituindo o Pick<UserContext, 'user'>
  isHost: boolean;
  stream: MediaStream;
  me: boolean;
  peers: KeyValue<Peer>;
  setPeers: Dispatch<SetStateAction<KeyValue<MediaConnection>>>;
  sharedScreenTrack: Nullable<MediaStreamTrack>;
  setSharedScreenTrack: Dispatch<SetStateAction<Nullable<MediaStreamTrack>>>;
};

export type RoomId = string;

export type AppendVideoStream = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => (stream: MediaStream) => void;

export type PeerId = string;

export type UserMessage = {
  user: string;
  text: string;
  time: string;
  shouldAggregate: boolean;
};

export type Status = 'loading' | 'idle' | 'rejected' | 'success';
export type Kind =
  | 'audio'
  | 'video'
  | 'chat'
  | 'users'
  | 'screen'
  | 'fullscreen';
