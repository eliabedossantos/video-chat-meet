import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';

import { ROOM_NAME } from 'common/constants';
import { createHost } from '@common/utils';
import WelcomeContainer from '@components/welcome-container';
import { UsersConnectionContext } from 'contexts/users-connection';
import { useUserContext } from 'contexts/user-info';

interface NextProps {
    roomId: string;
    isHost: string;
    name: string;
    picture: string;
    uuid: string;
}

const Next: NextPage = () => {
  const router = useRouter();
  const { roomId, isHost, name, picture, uuid } = router.query as unknown as NextProps;

  const { currentUser, updateCurrentUser } = useUserContext();


  const redirectToRoom = () => {
    if (roomId) {
      router.push(`/${ROOM_NAME}/${roomId}`);
    }
  };

  //http://localhost:3000/next?roomId=sj2jkko&isHost=true&name=Eliabe&picture=https://avatars.githubusercontent.com/u/72847444?v=4&uuid=1234

  const handleRoomCreation = () => {
    createHost(roomId as string);
    redirectToRoom();
  };

  useEffect(() => {
    if (name && picture && uuid) {
        updateCurrentUser({
            name,
            picture,
            id: uuid,
        });
    }

    if (typeof isHost === 'string') {
      setTimeout(() => {
        isHost === 'true' ? handleRoomCreation() : redirectToRoom();
      }, 1000);
    }
  }, [isHost, roomId, name, picture, uuid]);

  return (
    <div>
    {name && picture && uuid ? (
      <div className='flex flex-col items-center justify-center h-[100vh] w-full'>
          <span style={{ 
              fontSize: '1rem',
              color: 'white',
              textAlign: 'center',
          }}>
              Configurando a sala...
          </span>
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center h-[100vh] w-full'>
          <span style={{ 
              fontSize: '1rem',
              color: 'white',
              textAlign: 'center',
          }}>
              Ops! Algo deu errado...
          </span>
      </div>
    )}
    </div>
  );
};

export default Next;
