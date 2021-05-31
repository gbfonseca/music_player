import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import { MusicPlaceholder } from '~/assets/icons';
import { useMusic } from '~/hooks/music';
import { IAlbum } from '~/models/Album';

import {
  Container,
  Header,
  Title,
  Content,
  ImageAlbum,
  AlmbumView,
  AlmbumName,
  AlbumsList,
} from './styles';

function Albums(): ReactElement {
  const { albums } = useMusic();
  const { navigate } = useNavigation();
  return (
    <Container>
      <Header>
        <Title>Álbuns</Title>
      </Header>
      <Content>
        <AlbumsList
          data={albums}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          renderItem={({ item }) => {
            const album: IAlbum = item as IAlbum;
            return (
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() =>
                  navigate('Playing', {
                    screen: 'ViewAlbumMusics',
                    params: {
                      album,
                    },
                  })
                }
              >
                <AlmbumView>
                  <ImageAlbum
                    source={
                      album.cover_url
                        ? { uri: album.cover_url }
                        : MusicPlaceholder
                    }
                  />
                </AlmbumView>
                <AlmbumName>{album.title}</AlmbumName>
              </TouchableOpacity>
            );
          }}
        />
      </Content>
    </Container>
  );
}

export default Albums;
