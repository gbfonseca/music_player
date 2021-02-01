import React from 'react'
import {View, Text} from 'react-native';
import { PlayingMusic } from '../../components';
import { Container, Title } from './styles'

const Musics: React.FC = () => {
  return (
    <Container>
      <Title>Tocando agora</Title>
      <PlayingMusic />
    </Container>
  )
}

export default Musics;