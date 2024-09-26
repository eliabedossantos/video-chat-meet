import { useContext, useEffect, useState } from 'react';
import { useMediaStream } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { useRouter } from 'next/router';
import Peer from 'peerjs';

import { Nullable, PeerId, RoomId } from '@common/types';
import { error } from '@common/utils';
import { useUserContext } from 'contexts/user-info';

/**
 * Creates a peer and joins them into the room
 * @returns peer object, its id and meta-state whether is peer fully created
 */
const usePeer = (stream: MediaStream) => {
  const socket = useContext(SocketContext);
  const room = useRouter().query.ztalk as RoomId;
  const { muted, visible } = useMediaStream(stream);
  
  const { currentUser, updateCurrentUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [myId, setMyId] = useState<PeerId>('');

  useEffect(() => {
    (async function createPeerAndJoinRoom() {
      try {
        const peer = new (await import('peerjs')).default();
        setPeer(peer);
        setIsLoading(false);

        peer.on('open', (id) => {
          console.log('your device id: ', id);
          setMyId(id);
          socket.emit('room:join', {
            room,
            user: {
              id,
              muted,
              visible,
              name: currentUser?.name || 'Anonymous', // Usando nome real ou valor padrão
              picture: currentUser?.picture || 'https://via.placeholder.com/150', // Usando imagem real ou valor padrão
            },
          });
        });

        peer.on('error', error('Failed to setup peer connection'));
      } catch (e) {
        error('Unable to create peer')(e);
      }
    })();
  }, [currentUser, muted, visible, socket, room]); // Dependências importantes

  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};

export default usePeer;
