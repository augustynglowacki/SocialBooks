import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {palette} from 'src/styles';
import {AppButton, AppText, Container, FeatureButton} from './common';

export const Home: React.FC = () => {
  return (
    <Container style={styles.wrapper} flexStart>
      <AppText style={styles.title} variant="h1">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle}>
          MY DIGITAL
        </AppText>
      </AppText>
      <View>
        <AppText style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </AppText>
        <FeatureButton
          label="Hello world"
          style={{marginVertical: 24}}
          shadowMaxWidth={202}
          onPress={() => {
            console.log('click');
          }}
        />
        <FeatureButton
          label="Another Button"
          style={{marginVertical: 24}}
          shadowColor={palette.secondary}
          shadowMaxWidth={234}
          onPress={() => {
            console.log('click');
          }}
        />
        <AppText style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </AppText>
        <FeatureButton
          label="Lorem Ipsum"
          style={{marginVertical: 24}}
          shadowColor={palette.third}
          shadowMaxWidth={202}
          onPress={() => {
            console.log('click');
          }}
        />
        <AppButton
          label="Lorem Ipsum"
          style={{marginVertical: 24}}
          onPress={() => {
            console.log('click');
          }}
        />
        <AppButton
          label="Lorem Ipsum"
          style={{marginVertical: 24}}
          variant="secondary"
          onPress={() => {
            console.log('click');
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: palette.white,
  },
  title: {
    paddingTop: 40,
  },
  paragraph: {
    paddingTop: 50,
  },
  markedTitle: {
    color: palette.primary,
  },
});
