import { FlatList } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #212121;
  height: 100%;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0px 24px;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 12px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 36px;
  font-family: 'Poppins_600SemiBold';
  height: 45px;
`;

export const AlmbumView = styled.View`
  width: 140px;
  height: 140px;
  background: #c4c4c4;
  border-radius: 10px;
  margin: 15px;
`;

export const ImageAlbum = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

export const AlmbumName = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Poppins_400Regular';
  height: 45px;
  max-width: 120px;
  text-align: center;
  margin-top: 5px;
`;

export const AlbumsList = styled(FlatList)`
  width: 100%;
  height: 100%;
`;
