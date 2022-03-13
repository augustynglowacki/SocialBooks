import React from 'react';
import {ReviewDetails} from 'src/components/reviews/ReviewDetails';
import {ReviewDetailsScreenRouteProp} from 'src/constants';

interface Props {
  route: ReviewDetailsScreenRouteProp;
}

export const ReviewDetailsScreen: React.FC<Props> = ({route}) => {
  const {reviewData} = route.params;
  if (!reviewData) return null;
  return <ReviewDetails reviewData={reviewData} />;
};
