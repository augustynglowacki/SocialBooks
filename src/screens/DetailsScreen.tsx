import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {Container} from 'src/components/common';
import {DetailsScreenNavigationProp, DetailsScreenRouteProp} from 'src/constants';
import {Details} from 'src/components/Details';

interface Props {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

export const DetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const {book} = route.params;
  const goBack = () => navigation.goBack();

  if (!book) return null;
  return <Details book={book} goBack={goBack} />;
};
