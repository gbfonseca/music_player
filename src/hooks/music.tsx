import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Audio,  } from 'expo-av'

interface MusicProps {
  name: string;
  artist: string;
  id: number;
  path?: string;
}

interface MusicContextData {
  handleSetMusic(music: any): void;
  handleStopMusic(): Promise<void>;
  music: MusicProps;
  musicStatus: boolean;
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

  const [music, setMusic] = useState<MusicProps>({} as MusicProps);
  const [sound, setSound] = useState(new Audio.Sound());
  const [musicStatus, setMusicStatus] = useState(false);

  useEffect(() => {

    try {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })
    } catch(err) {
      console.log(err)
    }

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : setMusicStatus(false);
  }, [sound]);

  const handleSetMusic = useCallback(async (music) => {
    setMusic(music);
    if(music.path) {
      if (sound._loaded) {
        await sound.unloadAsync();
      }
       await sound.loadAsync(
        require('../assets/Vida_Real.mp3'),
        {
          shouldPlay: musicStatus,
        },
        false
      );
      setMusicStatus(sound._loaded);
      await sound.stopAsync();
      await sound.playAsync();
      setSound(sound);

    }
  }, []);

  const handleStopMusic = useCallback(async () => {
    sound._loaded ? await sound.pauseAsync() :  await sound.playAsync()
  
    setMusicStatus(prevState => !prevState);
  }, []); 

  return (
    <MusicContext.Provider value={{ handleSetMusic, music, handleStopMusic, musicStatus }}>
      {children}
    </MusicContext.Provider>
  );
}

export { MusicProvider, useMusic };