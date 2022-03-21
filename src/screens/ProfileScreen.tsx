import React from 'react';
import {useSelector} from 'react-redux';
import {Profile} from 'src/components/Profile';
import {userSelector} from 'src/redux/user/userSlice';

export const ProfileScreen: React.FC = () => {
  const {
    user: {userName, id},
  } = useSelector(userSelector);

  return <Profile name={userName} id={id} />;
};
