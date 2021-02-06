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
      <MusicsList>
        {musics.map(music => (
          <Music key={music.id} onPress={() => handleSelectMusic(music)}>
            <MusicCover source={MusicPlaceholder} />
            <View style={{ marginLeft: 10}}>
              <MusicName>{music.filename}</MusicName>
            </View>
          </Music>
        ))}
      </MusicsList>
      <PlayingMusic />
    </Container>
  )
}

export default Musics;