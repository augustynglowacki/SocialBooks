/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {FormikErrors} from 'formik';
import {Container, AppButton, Input, Message, AppText} from 'src/components/common';
import {palette} from 'src/styles';
import {Book, Review} from 'src/models';
import {BookComponent} from '../books';
import Stars from 'react-native-stars';
interface Props {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  setFieldValue: any;
  form: Review;
  errors: FormikErrors<Review>;
  serverError: string;
  loading: boolean;
  book: Book;
}
export const AddReview: React.FC<Props> = ({
  onChange,
  onSubmit,
  form,
  setFieldValue,
  serverError,
  errors,
  loading,
  book,
}) => {
  const scheme = useColorScheme();
  return (
    <Container withKeyboard withNavigateBackBar>
      <View style={styles.formWrapper}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {!!book && <BookComponent book={book} style={{marginVertical: 24}} shadowColor={palette.primary} disabled />}
          <AppText style={styles.title} variant="h1">
            Nowa Recenzja
          </AppText>
        </View>
        <View>
          <View style={styles.form}>
            <Stars
              half={false}
              default={form.rating}
              spacing={8}
              count={5}
              update={(val: any) => {
                setFieldValue('rating', val);
              }}
              starSize={40}
              color={palette.primary}
              fullStar={scheme === 'dark' ? require('src/assets/images/starFilled.png') : undefined}
              emptyStar={scheme === 'dark' ? require('src/assets/images/starEmpty.png') : undefined}
              halfStar={scheme === 'dark' ? require('src/assets/images/starHalf.png') : undefined}
            />
            <Input
              label={'Review'}
              style={{marginTop: 20}}
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
