import React, { createContext, useCallback, useContext, useState } from 'react';

interface MusicProps {
  name: string;
  artist: string;
  id: number;
}

interface MusicContextData {
  handleSetMusic(music: any): void;
  music: MusicProps;
}

const MusicContext = createContext<MusicContextData>({} as MusicContextData);

function useMusic(): MusicContextData {
  const context = useContext(MusicContext);

  if(!context) {
    throw new Error('useMusic must be used within an MusicProvider.');
  }

  return context;
}

const MusicProvider: React.FC = ({ children }) => {

  const [music, setMusic] = useState();

  const handleSetMusic = useCallback((music) => {
    setMusic(music)
  }, []);

  return (
    <MusicContext.Provider value={{ handleSetMusic, music }}>
      {children}
    </MusicContext.Provider>
  );
}

export { MusicProvider, useMusic };