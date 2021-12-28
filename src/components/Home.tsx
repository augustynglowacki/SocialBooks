import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import palette from 'src/styles/palette';
import {AppText} from './common';

const Home: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <AppText style={styles.title} variant="h1">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle}>
          SocialBooks!
        </AppText>
      </AppText>
      <View>
        <AppText variant="h1" style={styles.markedTitle}>
          SocialBooks!
        </AppText>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
    width: '100%',
    alignItems: 'center',
    backgroundColor: palette.white,
  },
  title: {
    fontSize: 36,
    paddingTop: 80,
    color: palette.black,
  },
  markedTitle: {
    fontSize: 36,
    color: palette.primary,
    fontWeight: '700',
  },
});
