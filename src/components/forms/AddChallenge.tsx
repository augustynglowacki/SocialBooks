/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {FormikErrors} from 'formik';
import {Container, AppButton, Input, Message, AppText} from 'src/components/common';
import {palette} from 'src/styles';
import {Book, Challenge} from 'src/models';
import {BookComponent} from '../books';

interface Props {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  setFieldValue: any;
  form: Challenge;
  errors: FormikErrors<Challenge>;
  serverError: string;
  loading: boolean;
}
export const AddChallenge: React.FC<Props> = ({
  onChange,
  onSubmit,
  form,
  setFieldValue,
  serverError,
  errors,
  loading,
}) => {
  const scheme = useColorScheme();
  console.log(form, errors);
  return (
    <Container withKeyboard withNavigateBackBar>
      <View style={styles.formWrapper}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <AppText style={styles.title} variant="h1">
            Nowe Wyzwanie
          </AppText>
        </View>
        <View>
          <View style={styles.form}>
            <Input
              label={'Wyzwanie'}
              style={{marginTop: 20}}
              value={form.challengeTitle}
              onChangeText={onChange('challengeTitle')}
              error={errors.challengeTitle}
            />
            <Input
              label={'Opis wyzwania'}
              value={form.challengeDescription}
              onChangeText={onChange('challengeDescription')}
              error={errors.challengeDescription}
              multiline
            />
            <AppButton
              style={styles.button}
              label={'Dodaj wyzwanie'}
              onPress={onSubmit}
              disabled={loading}
              variant="secondary"
            />
            {!!serverError && <Message label={serverError} />}
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    maxWidth: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
    marginLeft: 12,
  },
  form: {
    position: 'relative',
    marginTop: 25,
  },
  button: {
    marginTop: 30,
  },
});
