import React from 'react';
import {useSelector} from 'react-redux';
import {Profile} from 'src/components/Profile';
import {userSelector} from 'src/redux/user/userSlice';

export const ProfileScreen: React.FC = () => {
  const {
    user: {userName, photoURL},
  } = useSelector(userSelector);

  //   console.log(userName, photoURL);
  return <Profile photo={photoURL} name={userName} />;
};
