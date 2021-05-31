import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #212121;
  height: 100%;
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 21px;
  padding-left: 15px;
  font-family: 'Poppins_600SemiBold';
`;

export const MusicsList = styled(FlatList)`
  flex: 1;
  margin-top: 15px;
  padding: 20px 10px;
  margin-bottom: 10px;
`;

export const Music = styled.TouchableOpacity`
  border-bottom-color: #c4c4c4;
  border-bottom-width: 1px;
  padding: 0 0 10px;
  flex-direction: row;
  margin: 10px 0px;
  align-items: center;
`;

export const MusicCover = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

export const MusicName = styled.Text`
  font-family: 'Poppins_600SemiBold';
  color: #fff;
  letter-spacing: 0.4px;
  width: 85%;
  margin-left: 5px;
`;
