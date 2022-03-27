import React from 'react';
import {ChallengeDetails} from 'src/components/challenges';

import {ChallengeDetailsScreenRouteProp} from 'src/constants';

interface Props {
  route: ChallengeDetailsScreenRouteProp;
}

export const ChallengeDetailsScreen: React.FC<Props> = ({route}) => {
  const {challengeData} = route.params;
  if (!challengeData) return null;
  return <ChallengeDetails challengeData={challengeData} />;
};
