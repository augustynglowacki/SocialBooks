import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import palette from 'src/styles/palette';
import Icon from 'src/components/Icon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  onPress:
    | ((
        e:
          | React.MouseEvent<HTMLAnchorElement, MouseEvent>
          | GestureResponderEvent,
      ) => void)
    | undefined;
  focused: boolean;
  name: string;
  size?: number;
}

const TabIcon: React.FC<Props> = ({onPress, focused, name, size = 26}) => {
  const outline = name + '-outline';
  const scale = useSharedValue(1.15);
  const unFocusedScale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));
  const handleOnPress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
    }
    //sprobowac zrobic onpress na unfocused, zeby animacja sie zaczynala na klik, nie na zmiane state
    scale.value = withSequence(
      withTiming(1, {duration: 300}),
      withTiming(1.15, {duration: 400}),
    );
  };
  if (focused) {
    return (
      <TouchableOpacity
        onPress={e => handleOnPress(e)}
        style={styles.container}>
        <Animated.View style={[animatedStyle]}>
          <Icon
            style={styles.scale}
            color={palette.primary}
            name={name}
            size={size}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={e => handleOnPress(e)} style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <Icon color={palette.white} name={outline} size={size} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    alignItems: 'center',
  },
  scale: {
    transform: [{scale: 1.15}],
  },
});
