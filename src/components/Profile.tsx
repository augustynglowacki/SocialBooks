import {useTheme} from '@react-navigation/native';
import React, {FC} from 'react';
import {FlexStyle, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, AppText, FeatureButton} from 'src/components/common';
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

  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1}}>
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
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '40%',
    maxHeight: 300,
  },
  info: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: palette.black,
    marginLeft: 24,
  },
});
