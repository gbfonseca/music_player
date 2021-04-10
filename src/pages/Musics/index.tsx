import React, { useCallback } from 'react'
import {View, Text} from 'react-native';
import { MusicPlaceholder } from '../../assets/icons';
import { PlayingMusic } from '../../components';
import { useMusic } from '../../hooks/music';
import { Container, Header, Title, MusicsList, Music, MusicCover, MusicName } from './styles'

const Musics: React.FC = () => {

  const { musics, handleSetMusic } = useMusic();


  const handleSelectMusic = useCallback((music) => {
    handleSetMusic(music)
  }, [])

  return (
    <Container>
      <Header>
        <Title>Minhas músicas</Title>
      </Header>
      <MusicsList
        data={musics}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => {
          const music: any = item;
          return (
            <Music key={music.id} onPress={() => handleSelectMusic(music)}>
            <MusicCover source={music.coverUrl ? {uri: music.coverUrl} : MusicPlaceholder} />
            <View style={{ marginLeft: 10}}>
              <MusicName>{music.filename}</MusicName>
            </View>
          </Music>
          )
        }}
      />
      <PlayingMusic />
    </Container>
  )
}

export default Musics;
