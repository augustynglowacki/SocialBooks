import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {palette} from 'src/styles';
import {AppButton, AppLogo, AppText, Container} from 'src/components/common';
import {Route, WelcomeScreenProp} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeIn} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';

interface Props {}

export const WelcomeScreen: React.FC<Props> = ({}) => {
  const {navigate} = useNavigation<WelcomeScreenProp>();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigate(Route.HOME_NAVIGATOR);
      }
    });
    return subscriber;
  }, [navigate]);

  return (
    <Container style={styles.container} disableScroll>
      <Animated.View entering={FadeIn.springify().stiffness(15)}>
        <AppText style={styles.title} variant="h1">
          Welcome to{' '}
          <AppText style={styles.markedTitle} variant="h1" fontWeight="bold">
            SOCIALBOOKS
          </AppText>
        </AppText>
      </Animated.View>

      <Animated.View entering={FadeIn.springify().stiffness(15).delay(500)}>
        <AppLogo />
      </Animated.View>
      <Animated.View entering={FadeIn.springify().stiffness(15).delay(500)}>
        <AppButton
          label="Register"
          style={{marginBottom: 36}}
          onPress={() => {
            navigate(Route.REGISTER);
          }}
        />
        <AppButton
          label="Login"
          style={{marginBottom: 48}}
          variant="secondary"
          onPress={() => {
            navigate(Route.LOGIN);
          }}
        />
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
  },
  container: {
    paddingTop: 20,
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  markedTitle: {
    color: palette.primary,
    paddingTop: 10,
    fontSize: 40,
  },
});
