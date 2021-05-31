/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import { IAlbum } from '~/models/Album';
import { MusicFile } from '~/models/MusicFile';

interface MusicContextData {
  handleSetMusic(music: MusicFile, options?: AVPlaybackStatus): void;
  handleStopMusic(): Promise<void>;
  handleFindMusic(): void;
  music: MusicProps;
  musicStatus: boolean;
  musics: MusicProps[];
  musicDuration: any;
  loading: boolean;
  sound: Audio.Sound;
  setMusicOptions(musicOptions: any): void;
  musicOptions: any;
  handleFindCovers(): void;
  musicsRecents: string[];
  musicsFavorites: string[];
  setMusicsFavorites(musicFavorites: string[]): void;
  handleNextPrevMusic(index: number): void;
  albums: IAlbum[];
}

interface MusicProps {
  albumId: string;
  creationTime: number;
  duration: number;
  filename: string;
  height: number;
  id: string;
  mediaType: string;
  modificationTime: number;
  uri: string;
  width: number;
  coverUrl?: string;
}

const MusicContext = createContext<MusicContextData>({} as MusicContextData);

function useMusic(): MusicContextData {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useMusic must be used within an MusicProvider.');
  }

  return context;
}

const MusicProvider: React.FC = ({ children }) => {
  const [music, setMusic] = useState<MusicProps>({} as MusicProps);
  const [musics, setMusics] = useState<MusicProps[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [musicsFavorites, setMusicsFavorites] = useState<string[]>([]);
  const [musicsRecents, setMusicsRecents] = useState<string[]>([]);
  const [sound, setSound] = useState(new Audio.Sound());
  const [musicStatus, setMusicStatus] = useState(false);
  const [musicDuration, setMusicDuration] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [musicOptions, setMusicOptions] = useState({
    shouldPlay: musicStatus,
    isLooping: false,
    positionMillis: 0,
    volume: 1.0,
  });

  useEffect(() => {
    const loadMediaLibrary = async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

      if (status !== 'granted') {
        console.log('Library not granted');
        return;
      }
      const musicsStoraged = await AsyncStorage.getItem('@RNMusicPlayer');
      const favorites = await AsyncStorage.getItem('@RNMusicPlayer: favorites');
      const albumsStoraged = await AsyncStorage.getItem(
        '@RNMusicPlayer:albums',
      );
      if (musics) {
        await setMusics(JSON.parse(musicsStoraged as string) as MusicProps[]);
      }
      if (favorites) {
        await setMusicsFavorites(JSON.parse(favorites as string));
      }
      if (albumsStoraged) {
        await setAlbums(JSON.parse(albumsStoraged as string));
      }
    };
    loadMediaLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
      });
    } catch (err) {
      console.log(err);
    }

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : setMusicStatus(false);
  }, [sound]);

  const handleFindMusic = useCallback(async () => {
    setLoading(true);
    const mapMusics: MusicFile[] = [];
    await AsyncStorage.removeItem('@RNMusicPlayer');
    const response = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 10000,
    });
    response.assets.map((musicFilter) => {
      if (!musicFilter.filename.startsWith('AUD-')) {
        mapMusics.push(musicFilter as MusicFile);
      }
      return musicFilter;
    });
    setMusics(mapMusics as MusicFile[]);
    await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(mapMusics));

    const responseAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: false,
    });

    const albumMaps: Array<IAlbum> = [];
    const filtereds: Array<string> = [];
    for (let i = 0; i < responseAlbums.length; i += 1) {
      mapMusics.forEach((mappedMusic) => {
        if (mappedMusic.albumId === responseAlbums[i].id) {
          if (!filtereds.includes(responseAlbums[i].id)) {
            albumMaps.push(responseAlbums[i] as IAlbum);
            filtereds.push(responseAlbums[i].id);
          }
        }
      });
    }
    await AsyncStorage.setItem(
      '@RNMusicPlayer:albums',
      JSON.stringify(albumMaps),
    );
    setAlbums(albumMaps);
    setLoading(false);
  }, []);

  const handleSetMusic = useCallback(
    async (musicSet, options?) => {
      setMusic(musicSet);
      if (musicSet) {
        if (sound._loaded) {
          await sound.unloadAsync();
        }
        await sound.loadAsync(
          {
            uri: musicSet.uri,
          },
          options,
          false,
        );
        await sound.stopAsync();
        await sound.playAsync();
        setSound(sound);
        if (musicsRecents.length < 20) {
          const musicString = JSON.stringify(musicSet);
          if (!musicsRecents.includes(musicString)) {
            setMusicsRecents((prevState) => [musicString, ...prevState]);
          }
        }
        sound.getStatusAsync().then((response: any) => {
          setMusicDuration(response.durationMillis as number);
          setMusicStatus(response.isPlaying);
        });
      }
    },
    [musicsRecents, sound],
  );

  const handleStopMusic = useCallback(async () => {
    musicStatus ? await sound.pauseAsync() : await sound.playAsync();
    setMusicStatus((prevState) => !prevState);
  }, [musicStatus, sound]);

  const handleFindCovers = useCallback(async () => {
    setLoading(true);
    const musicMaps: Array<MusicFile> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const musicFilter of musics) {
      let coverPath;
      let coverFilename;
      // eslint-disable-next-line no-await-in-loop
      await MediaLibrary.getAssetsAsync({
        first: 10000,
        album: musicFilter.albumId,
      }).then((responseCover) => {
        return responseCover.assets.filter((cover) => {
          return (
            (coverPath = cover.uri.replace(cover.filename, '')),
            (coverFilename = cover.filename)
          );
        });
      });
      if (coverPath === musicFilter.uri.replace(musicFilter.filename, '')) {
        musicFilter.coverUrl = coverPath + coverFilename;
      }
      if (!musicFilter.filename.startsWith('AUD-')) {
        musicMaps.push(musicFilter);
      }
    }
    await AsyncStorage.setItem('@RNMusicPlayer', JSON.stringify(musicMaps));
    setMusics(musicMaps);
    const albumMaps: Array<IAlbum> = [];
    const filtereds: Array<string> = [];
    // eslint-disable-next-line no-restricted-syntax
    // for (const almbumFilter of albums) {
    for (let i = 0; i < albums.length; i += 1) {
      musicMaps.forEach((musicMapped) => {
        if (musicMapped.albumId === albums[i].id) {
          albums[i].cover_url = musicMapped.coverUrl;
          if (!filtereds.includes(albums[i].id)) {
            albumMaps.push(albums[i]);
            filtereds.push(albums[i].id);
          }
        }
      });
    }
    await AsyncStorage.setItem(
      '@RNMusicPlayer:albums',
      JSON.stringify(albumMaps),
    );
    setAlbums(albumMaps);
    setLoading(false);
  }, [albums, musics]);

  const handleNextPrevMusic = useCallback(
    async (index: number) => {
      const selectMusic = musics[index];
      await handleSetMusic(selectMusic);
    },
    [handleSetMusic, musics],
  );

  return (
    <MusicContext.Provider
      value={{
        handleSetMusic,
        music,
        handleStopMusic,
        musicStatus,
        musics,
        handleFindMusic,
        musicDuration,
        loading,
        sound,
        setMusicOptions,
        musicOptions,
        handleFindCovers,
        musicsRecents,
        musicsFavorites,
        setMusicsFavorites,
        handleNextPrevMusic,
        albums,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export { MusicProvider, useMusic };
