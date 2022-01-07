import React, {useEffect, useState} from 'react';
import {SerializedError} from '@reduxjs/toolkit';
import {StyleSheet, View} from 'react-native';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppButton, AppText, Container, FeatureButton} from 'src/components/common';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProp, Route} from 'src/constants';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser} from 'src/redux/user/userActions';
import {userSelector} from 'src/redux/user/userSlice';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {ReviewList} from './reviews';
interface Props {}

export const Home: React.FC<Props> = () => {
  // console.log(error);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<HomeScreenProp>();
  const {
    user: {userName},
  } = useSelector(userSelector);
  const {favorite, reviews, error, loading} = useSelector(collectionsSelector);
  return (
    <Container style={styles.container} disableScroll>
      <AppText style={styles.title} variant="h1">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle} fontWeight="bold">
          {!!userName && userName}
        </AppText>
      </AppText>
      <View style={{width: '100%', flex: 1}}>
        <AppText style={styles.collectionTitle} fontWeight="bold">
          Latest Reviews:
        </AppText>

        {!!reviews ? (
          <ReviewList data={reviews} error={error} loading={loading} />
        ) : (
          <AppText style={{paddingTop: 12}}>Error loading reviews :/</AppText>
        )}

        {/* <FeatureButton
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
        )} */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
  },
  container: {
    paddingTop: 20,
    justifyContent: 'flex-start',
    flex: 1,
  },
  collectionTitle: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  markedTitle: {
    color: palette.primary,
  },
});
