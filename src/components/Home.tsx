import React, {useEffect, useState} from 'react';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppButton, AppText, Container, FeatureButton} from 'src/components/common';
import {useNavigation} from '@react-navigation/native';
import {ErrorType, HomeScreenProp, Route} from 'src/constants';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser} from 'src/redux/user/userActions';
import auth from '@react-native-firebase/auth';
import {userSelector} from 'src/redux/user/userSlice';
interface Props {
  book: Book | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ErrorType;
  refetch: () => void;
}

export const Home: React.FC<Props> = ({book, isLoading, isError, error, refetch}) => {
  // console.log(error);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<HomeScreenProp>();
  const {
    user: {userName},
  } = useSelector(userSelector);

  return (
    <Container>
      <AppText style={styles.title} variant="h1">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle}>
          {!!userName && userName}
        </AppText>
      </AppText>
      <View style={{width: '100%'}}>
        <AppText style={styles.paragraph} variant="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </AppText>
        {!!book && (
          <BookComponent
            book={book}
            style={{marginVertical: 24}}
            shadowColor={palette.secondary}
            onPress={() => navigate(Route.DETAILS, {book, id: book.id})}
          />
        )}
        <FeatureButton
          label="Register"
          style={{marginVertical: 24}}
          shadowMaxWidth={169}
          onPress={() => {
            navigate(Route.REGISTER);
          }}
          disabled={!!userName}
        />
        {!!userName ? (
          <FeatureButton
            label="Logout"
            style={{marginVertical: 24}}
            shadowColor={palette.secondary}
            shadowMaxWidth={148}
            onPress={() => dispatch(logOutUser())}
          />
        ) : (
          <FeatureButton
            label="Login"
            style={{marginVertical: 24}}
            shadowMaxWidth={137}
            onPress={() => {
              navigate(Route.LOGIN);
            }}
          />
        )}

        {/* <AppText style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </AppText> */}
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
  title: {
    paddingTop: 10,
  },
  paragraph: {
    paddingTop: 50,
  },
  markedTitle: {
    color: palette.primary,
  },
});
