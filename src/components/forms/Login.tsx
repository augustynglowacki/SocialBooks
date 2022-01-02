/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {FlipInYRight} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {FormikErrors} from 'formik';
import {Container, AppButton, Input, Message, AppLogo} from 'src/components/common';
import {LoginScreenProp, Route} from 'src/constants';
import {palette} from 'src/styles';
import {LoginUser} from 'src/models';

interface Props {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  form: LoginUser;
  errors: FormikErrors<LoginUser>;
  serverError: string;
  loading: boolean;
}
export const Login: React.FC<Props> = ({onChange, onSubmit, form, serverError, errors, loading}) => {
  const {t} = useTranslation('common');
  const {navigate} = useNavigation<LoginScreenProp>();
  const goToRegister = () => navigate(Route.REGISTER);
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const handleHide = () => setHiddenPassword(!hiddenPassword);
  return (
    <Container withKeyboard style={styles.wrapper}>
      <Animated.View entering={FlipInYRight.springify()}>
        <AppLogo style={styles.logoImage} />
      </Animated.View>
      <View>
        <Text style={styles.title}>{t('welcomeMessage')}</Text>
        <View style={styles.form}>
          <Input
            label={t('email')}
            value={form.email}
            onChangeText={onChange('email')}
            error={errors.email}
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <Input
            label={t('password')}
            value={form.password}
            onChangeText={onChange('password')}
            secureTextEntry={hiddenPassword}
            error={errors.password}
            right={<TextInput.Icon name="eye" color={palette.third} onPress={handleHide} />}
          />
          <AppButton style={styles.button} label={t('login')} onPress={onSubmit} loading={loading} />
          {!!serverError && <Message label={serverError} />}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.black,
  },
  logoImage: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
    color: palette.white,
  },
  form: {
    position: 'relative',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
