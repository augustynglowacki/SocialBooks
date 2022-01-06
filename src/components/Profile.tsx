import {useTheme} from '@react-navigation/native';
import React, {FC} from 'react';
import {Dimensions, FlexStyle, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, AppText, FeatureButton, InfoBox, Stats, Container} from 'src/components/common';
import {logOutUser} from 'src/redux/user/userActions';
import {palette} from 'src/styles';
import {useDispatch} from 'react-redux';
interface Props {
  name: string;
  photo: string;
}

export const Profile: FC<Props> = ({name, photo}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const gradientStyle: StyleProp<ViewStyle | FlexStyle> = {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  };
  const stats: Stats[] = [
    {label: 'Favorite', count: 1},
    {label: 'Reviews', count: 2},
  ];

  // giving background color to SafeAreaView is the only way to have the blue color, giving the gradient
  // "endless" feeling at the top when "pulling/scrolling" down the screen. Other way would be to set it
  // as "background" color in App.tsx themes, but only for route.profile
  return (
    <Container style={styles.wrapper} safeAreaEdges={['left', 'right']} padding="none">
      <View style={styles.gradient}>
        <LinearGradient
          colors={[palette.secondary, palette.primary, palette.third, colors.background]}
          style={gradientStyle}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <SafeAreaView>
            <View style={styles.info}>
              <Avatar source={photo} name={name} />
              <AppText style={styles.title} variant="h1">
                {name}
              </AppText>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
      <View style={styles.info}>
        <InfoBox stats={stats} shadowColor={palette.third} style={styles.infoBox} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: palette.secondary,
  },
  gradient: {
    height: '40%',
    maxHeight: 300,
    flex: 1,
  },
  info: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    alignSelf: 'center',
    transform: [{translateY: -Dimensions.get('window').height * 0.03}],
  },
  title: {
    color: palette.black,
    marginLeft: 24,
  },
});
