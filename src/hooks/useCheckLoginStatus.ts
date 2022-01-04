import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, userSelector} from 'src/redux/user/userSlice';

export default function useCheckLoginStatus() {
  const {
    user: {email},
  } = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!email) {
      const subscriber = auth().onAuthStateChanged(userFirebase => {
        if (userFirebase) {
          dispatch(
            setActiveUser({
              email: userFirebase.email,
              userName: userFirebase.displayName,
              photoURL: userFirebase.photoURL,
            }),
          );
        }
      });
      return subscriber;
    }
  }, [email, dispatch]);
}
