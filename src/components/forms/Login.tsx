/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {FlipInYRight} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {FormikErrors} from 'formik';
import {Container, AppButton, Input, Message, AppLogo} from 'src/components/common';
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
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const handleHide = () => setHiddenPassword(!hiddenPassword);
  return (
    <Container withKeyboard withNavigateBackBar scrollViewContainerStyle={styles.wrapper}>
      <View style={styles.formWrapper}>
        <Animated.View entering={FlipInYRight.springify().stiffness(65)}>
          <AppLogo style={styles.logoImage} />
        </Animated.View>
        <View>
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
            <AppButton style={styles.button} label={t('login')} onPress={onSubmit} disabled={loading} />
            {!!serverError && <Message label={serverError} />}
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  formWrapper: {
    maxWidth: '90%',
    alignSelf: 'center',
  },
  logoImage: {
    alignSelf: 'center',
    // marginTop: 100,
  },
  form: {
    position: 'relative',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
