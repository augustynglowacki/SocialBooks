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
      const subscriber = auth().onAuthStateChanged(item => {
        if (item) {
          dispatch(
            setActiveUser({
              email: item.email,
              userName: item.displayName,
              id: item.uid,
            }),
          );
        }
      });
      return subscriber;
    }
  }, [email, dispatch]);
}
