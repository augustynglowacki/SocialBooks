import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface Props {
  name: string;
  size?: number;
  color?: string;
  testID?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

export const Icon: React.FC<Props> = ({...props}) => {
  return <Ionicon {...props} />;
};
