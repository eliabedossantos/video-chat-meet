import { ToastContainerProps } from 'react-toastify';

export const ROOM_NAME = 'ztalk';
export const WINDOW_SIZE_IN_SAMPLES = 1024;
export const MYSELF = 'Você';
export const SOCKET_PATH = '/api/socketio';
export const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'dark',
  autoClose: 3000,
};
export const FAILURE_MSG =
  "Tivemos um problema. Por favor, tente novamente mais tarde. 🙏";
export const LOADER_STREAM_MSG =
  'Aguarde. estamos preparando tudo para você... 🎮';
export const LOADER_PEER_MSG = 'Aguarde. estamos conectando você... 🎮';