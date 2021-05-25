import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { useMusic } from '~/hooks/music';

import {
  Container,
  Header,
  Title,
  OptionButton,
  OptionName,
  Content,
} from './styles';

function Options(): ReactElement {
  const { goBack } = useNavigation();
  const { handleFindCovers } = useMusic();
  return (
    <Container>
      <Header>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
          <Title>Configuração</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <OptionButton onPress={handleFindCovers}>
          <Feather name="disc" size={32} color="white" />
          <OptionName>Buscar capas de músicas</OptionName>
        </OptionButton>
      </Content>
    </Container>
  );
}

export default Options;
