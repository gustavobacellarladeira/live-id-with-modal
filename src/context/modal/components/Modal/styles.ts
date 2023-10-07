import styled from 'styled-components';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

export const Container = styled(Modal)``;

export const ModalContainer = styled(View)``;

export const Close = styled(TouchableOpacity)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

export const Title = styled(Text)``;

export const Description = styled(Text)``;

export const ButtonContainer = styled(View)``;

export const Link = styled(Text)``;
