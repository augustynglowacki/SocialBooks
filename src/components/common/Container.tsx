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
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
interface Props {
  style?: StyleProp<ViewStyle>;
  //specify withKeyboard prop when using Container if you want KeyboardAvoidingView
  withKeyboard?: boolean;
  padding?: 'small' | 'none';
  flexStart?: boolean;
  edges?: Edge[];
  disableScroll?: boolean;
}

export const Container: React.FC<Props> = ({
  style,
  children,
  withKeyboard,
  padding,
  flexStart,
  edges = ['top', 'left', 'right'],
  disableScroll,
}) => {
  const {colors} = useTheme();
  const getPadding = (): StyleProp<FlexStyle> => {
    switch (padding) {
      case 'small': {
        return {paddingVertical: 0, paddingHorizontal: 6};
      }
      case 'none': {
        return {padding: 0};
      }
      default:
        return {paddingVertical: 8, paddingHorizontal: 14};
    }
  };

  const content = (
    <SafeAreaView style={[styles.safeArea, style]} edges={edges}>
      {disableScroll ? (
        <View style={[styles.wrapper, style, getPadding(), {backgroundColor: colors.background}]}>{children}</View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.wrapper, style, getPadding(), {backgroundColor: colors.background}]}>{children}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );

  return withKeyboard ? (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.kbView}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minWidth: '100%',
  },
  kbView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
