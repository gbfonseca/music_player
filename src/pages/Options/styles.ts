import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #212121;
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70px;
  padding: 8px 16px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-family: 'Poppins_600SemiBold';
  margin-left: 10px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const OptionButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
`;

export const OptionName = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 18px;
  color: #fff;
  letter-spacing: 0.4px;
  margin-left: 10px;
`;
