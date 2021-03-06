import React, { useCallback } from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';

import { FindMusic } from '~/assets/animations';
import { MusicFile } from '~/models/MusicFile';

import {
  Container,
  Header,
  Title,
  MusicsList,
  Music,
  MusicCover,
  MusicName,
} from './styles';

import { MusicPlaceholder } from '../../assets/icons';
import { PlayingMusic } from '../../components';
import { useMusic } from '../../hooks/music';

const Musics: React.FC = () => {
  const { musics, handleSetMusic } = useMusic();

  const handleSelectMusic = useCallback(
    (music) => {
      handleSetMusic(music);
    },
    [handleSetMusic],
  );

  return (
    <Container>
      <Header>
        <Title>Minhas músicas</Title>
      </Header>
      {musics?.length > 0 ? (
        <MusicsList
          data={musics}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }) => {
            const music: MusicFile = item as MusicFile;
            return (
              <Music key={music.id} onPress={() => handleSelectMusic(music)}>
                <MusicCover
                  source={
                    music.coverUrl ? { uri: music.coverUrl } : MusicPlaceholder
                  }
                />
                <MusicName>
                  {music.filename
                    .replace('.mp3', '')
                    .replace(/^[0-9]*/gm, '')
                    .replace('- ', '')}
                </MusicName>
              </Music>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LottieView source={FindMusic} autoPlay loop />
        </View>
      )}
      <PlayingMusic />
    </Container>
  );
};

export default Musics;
