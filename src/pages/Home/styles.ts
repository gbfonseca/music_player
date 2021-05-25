import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #212121;
  height: 100%;
`;

export const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 12px;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: 36px;
  font-family: 'Poppins_600SemiBold';
  height: 45px;
`;

export const Button = styled.TouchableOpacity`
  /* padding: 0px; */
  flex: 1;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #F1F1F1;
  font-family: 'Poppins_400Regular';
  
`;


export const SubTitle = styled.Text`
  color: #FFF;
  font-size: 16px;
  font-family: 'Poppins_600SemiBold';
  margin-bottom: 10px;
`;

export const ImageMusic = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

export const RecentlyPlayed = styled.View`
  margin-top: 20px;
  padding: 0 12px;
`;

export const MusicRecently = styled.View`
  width: 100px;
  height: 100px;
  background: #c4c4c4;
  border-radius: 10px;
`;

export const MostPlayed = styled.View`

  margin-top: 50px;
  padding: 0 12px;
`;

export const MusicMostPlay = styled.View`
  width: 150px;
  height: 150px;
  background: #c4c4c4;
  border-radius: 10px;
`;

export const Gender = styled.View`
  margin-top: 30px;
  padding: 0 12px;
`;

export const GenderItem = styled.View`
  width: 125px;
  height: 50px;
  background: #c4c4c4;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const GenderText = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 18px;
`;

export const Play = styled.Image`
  position: absolute;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 45px;
  height: 45px;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;