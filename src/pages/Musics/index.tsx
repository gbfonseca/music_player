import React, { useCallback } from 'react';
import { View } from 'react-native';

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
              <View style={{ marginLeft: 10 }}>
                <MusicName>{music.filename}</MusicName>
              </View>
            </Music>
          );
        }}
      />
      <PlayingMusic />
    </Container>
  );
};

export default Musics;
