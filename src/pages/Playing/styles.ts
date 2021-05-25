import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 26px;
  align-items: center;
`;

export const Header = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 90%;
`;

export const Image = styled.Image`
  width: 90%;
  height: 300px;
  border-radius: 20px;
  margin-top: 30px;
  box-shadow: 0px 32px 13px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.Text`
  margin-top: 15px;
  max-width: 290px;
  text-align: center;
  font-family: 'Poppins_600SemiBold';
  font-size: 20px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: #fff;
`;

export const SubTitle = styled.Text`
  max-width: 290px;
  text-align: center;
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: #fff;
`;

export const Slider = styled.Slider`
  width: 100%;
`;

export const ViewMusicDuration = styled.View`
  width: 95%;
`;

export const DurationView = styled.View`
  width: 100%;
  padding: 0 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const DurationTime = styled.Text`
  text-align: center;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: #fff;
`;

export const Buttons = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const Play = styled.TouchableOpacity`
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  background: #fff;
  border-radius: 50px;
  width: 75px;
  height: 75px;
  margin-left: 40px;
  align-items: center;
  justify-content: center;
`;

export const Back = styled.Text`
  color: #fff;
  font-family: 'Poppins_400Regular';
  font-size: 16px;
`;
