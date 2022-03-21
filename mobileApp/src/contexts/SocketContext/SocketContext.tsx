import React, {
  createContext,
  ReactNode,
  ReactNodeArray,
  useContext,
  useEffect,
  useState,
} from 'react';
import {io, Socket} from 'socket.io-client';
import config from './../../config';

interface IProps {
  children: ReactNode | ReactNodeArray;
}

const SocketContext = createContext<Socket | undefined>(undefined);

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({children}: IProps) {
  const [socket, setSocket] = useState<Socket | undefined>();

  const addConnectivityListeners = (newSocket: Socket) => {
    newSocket.on('connect', () => setSocket(newSocket));
    newSocket.on('disconnect', () => setSocket(undefined));
  };

  useEffect(() => {
    const socket = io(config.SERVER_URL);
    addConnectivityListeners(socket);

    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
