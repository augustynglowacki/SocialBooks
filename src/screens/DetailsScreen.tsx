import React from 'react';
import {DetailsScreenNavigationProp, DetailsScreenRouteProp} from 'src/constants';
import {Details} from 'src/components/Details';

interface Props {
  route: DetailsScreenRouteProp;
}

export const DetailsScreen: React.FC<Props> = ({route}) => {
  const {book} = route.params;
  if (!book) return null;
  return <Details book={book} />;
};
