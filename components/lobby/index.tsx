import { VideoCameraIcon, MicrophoneIcon } from '@heroicons/react/solid';
import Tooltip from 'react-tooltip';

import { useMediaStream } from '@hooks/index';
import { MYSELF } from '@common/constants';
import { CrossLineDiv } from '@common/components';
import { PeerVideo, VideoContainer } from '..';
import { useContext } from 'react';
import { useUserContext } from 'contexts/user-info';

export default function Lobby({
  stream,
  onJoinRoom,
}: {
  stream: MediaStream;
  onJoinRoom: () => void;
}) {
  const { currentUser, updateCurrentUser } = useUserContext();
  const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);

  return (
    <div className="h-screen w-auto grid gap-4 place-content-center place-items-center p-4">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <VideoContainer
            id="me"
            muted={muted}
            visible={visible}
            stream={stream}
            userPicture={currentUser?.picture || ''} 
          >
            <PeerVideo key="me" stream={stream} name={currentUser?.name || MYSELF} isMe={true} />
          </VideoContainer>
        </div>

        <div className="flex justify-center gap-5 mt-5">
          <button
            onClick={toggleVideo}
            data-for="visibility"
            data-tip={`${!visible ? 'ativar' : 'desativar'}`}
            className="p-3 rounded-[100%] text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <VideoCameraIcon className="h-6 w-6" />
            {!visible && <CrossLineDiv />}
          </button>
          <Tooltip id="visibility" effect="solid" />

          <button
            onClick={() => toggle('audio')(stream)}
            data-for="audio"
            data-tip={`${muted ? 'desmutar' : 'mutar'}`}
            className="p-3 rounded-[100%] text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <MicrophoneIcon className="h-6 w-6" />
            {muted && <CrossLineDiv />}
          </button>
          <Tooltip id="audio" effect="solid" />
        </div>
        
      </div>

      <button
        onClick={onJoinRoom}
        type="button"
        className="py-2 px-10 text-sm font-medium rounded-[100px] text-emerald-800 bg-blue-300 hover:bg-indigo-200 mt-10"
      >
        Entrar
      </button>
    </div>
  );
}
