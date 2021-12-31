import React from 'react';
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
