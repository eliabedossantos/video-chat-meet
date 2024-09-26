import { useContext } from 'react';
import { MYSELF } from '@common/constants';
import { UsersConnectionContext } from 'contexts/users-connection';

import VideoContainer from '@components/video-container';
import { PeerVideo } from '..';

export default function MyStream({
  stream,
  muted,
  visible,
}: {
  stream: MediaStream;
  muted: boolean;
  visible: boolean;
}) {
  const { myId, currentUser } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      muted={muted}
      visible={visible}
      stream={stream}
      userPicture={currentUser?.picture}
    >
      <PeerVideo stream={stream} name={MYSELF} isMe={true} />
    </VideoContainer>
  );
}
