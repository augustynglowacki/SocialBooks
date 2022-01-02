import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInputProps} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {palette} from 'src/styles';

interface Props extends Partial<TextInputProps> {
  right?: React.ReactNode;
  label: string;
  error?: string;
  left?: React.ReactNode;
  fullWidth?: boolean;
}
export const Input: React.FC<Props> = ({
  onChangeText,
  style,
  value,
  label,
  error,
  right,
  left,
  editable,
  clearButtonMode,
  secureTextEntry,
  fullWidth,
  autoFocus,
  children,
  autoCapitalize = 'none', //if u want input with automatic capital letter use autoCapitalize = 'words',
}) => {
  const getWidth = () => {
    return {width: fullWidth ? '100%' : '80%'};
  };
  const {
    colors: {background, text},
  } = useTheme();
  return (
    <View style={styles.wrap}>
      <TextInput
        mode="outlined"
        style={[styles.textInput, getWidth(), {backgroundColor: background}, style]}
        onChangeText={onChangeText}
        value={value}
        theme={{
          colors: {
            primary: text,
            text: text,
            placeholder: palette.grey,
          },
        }}
        outlineColor={palette.primary}
        placeholderTextColor={text}
        label={label.charAt(0).toUpperCase() + label.slice(1)}
        right={right}
        left={left}
        secureTextEntry={secureTextEntry}
        clearButtonMode={clearButtonMode}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        editable={editable}
        autoComplete={undefined}>
        {children}
      </TextInput>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    width: '80%',
    alignSelf: 'center',
    maxWidth: 400,
  },
  wrap: {
    marginBottom: 12,
  },
  error: {
    alignSelf: 'center',
    width: '80%',
    maxWidth: 400,
    color: palette.error,
    fontSize: 12,
    marginTop: 1,
  },
});
