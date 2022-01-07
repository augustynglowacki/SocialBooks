/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {FlipInYRight} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {FormikErrors} from 'formik';
import {Container, AppButton, Input, Message, AppLogo, AppText} from 'src/components/common';
import {palette} from 'src/styles';
import {Book, Review} from 'src/models';
import {BookComponent} from '../books';

interface Props {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  form: Review;
  errors: FormikErrors<Review>;
  serverError: string;
  loading: boolean;
  book: Book;
}
export const AddReview: React.FC<Props> = ({onChange, onSubmit, form, serverError, errors, loading, book}) => {
  return (
    <Container withKeyboard withNavigateBackBar>
      <View style={styles.formWrapper}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {!!book && <BookComponent book={book} style={{marginVertical: 24}} shadowColor={palette.primary} disabled />}
          <AppText style={styles.title} variant="h1">
            New Review
          </AppText>
        </View>
        <View>
          <View style={styles.form}>
            <Input
              label={'Review'}
              value={form.reviewTitle}
              onChangeText={onChange('reviewTitle')}
              error={errors.reviewTitle}
            />
            <Input
              label={'Description'}
              value={form.reviewDescription}
              onChangeText={onChange('reviewDescription')}
              error={errors.reviewDescription}
              multiline
            />
            <AppButton
              style={styles.button}
              label={'Create review'}
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
  logoImage: {
    alignSelf: 'center',
    // marginTop: 100,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
    marginLeft: 12,
  },
  form: {
    position: 'relative',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
