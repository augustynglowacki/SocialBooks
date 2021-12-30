import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  FlexStyle,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
interface Props {
  style?: StyleProp<ViewStyle>;
  //specify withKeyboard prop when using Container if you want KeyboardAvoidingView
  withKeyboard?: boolean;
  padding?: 'small' | 'none';
  flexStart?: boolean;
  disableScroll?: boolean;
}

export const Container: React.FC<Props> = ({style, children, withKeyboard, padding, flexStart, disableScroll}) => {
  const {colors} = useTheme();
  const getJustifyContent = (): StyleProp<FlexStyle> => {
    return {justifyContent: flexStart ? 'flex-start' : 'center'};
  };

  const getPadding = (): StyleProp<FlexStyle> => {
    switch (padding) {
      case 'small': {
        return {paddingVertical: 0, paddingHorizontal: 6};
      }
      case 'none': {
        return {padding: 0};
      }
      default:
        return {paddingVertical: 8, paddingHorizontal: 10};
    }
  };

  const content = (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View
        testID="styled"
        style={[styles.wrapper, style, getPadding(), getJustifyContent(), {backgroundColor: colors.background}]}>
        {children}
      </View>
    </SafeAreaView>
  );

  const scrollWrapper = disableScroll ? (
    content
  ) : (
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
      {content}
    </ScrollView>
  );

  return withKeyboard ? (
    <KeyboardAvoidingView
      testID="keyboard"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.kbView}>
      {scrollWrapper}
    </KeyboardAvoidingView>
  ) : (
    scrollWrapper
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  kbView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
