import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {LoginScreenProp, Route} from 'src/constants';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {signInWithEmailAndPassword} from 'src/redux/user/userActions';
import {LoginUser} from 'src/models';
import {setErrorNull, userSelector} from 'src/redux/user/userSlice';
import {useFocusEffect} from '@react-navigation/native';
import {Login} from 'src/components/forms/Login';

const initialValues = {email: '', password: ''};
const LoginScreen: React.FC = () => {
  const {error, loading} = useSelector(userSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<LoginScreenProp>();
  const {t} = useTranslation('form');

  useFocusEffect(
    useCallback(() => {
      dispatch(setErrorNull());
    }, []),
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigate(Route.HOME);
      }
    });
    return subscriber;
  }, [navigate]);

  const handleLoginUser = ({email, password}: LoginUser) => {
    dispatch(
      signInWithEmailAndPassword({
        email,
        password,
      }),
    );
  };

  const onSubmit = () => {
    handleLoginUser(values);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t('email')).required(t('required')),
    password: Yup.string()
      .min(6, t('short', {length: 6}))
      .required(t('required')),
  });

  const {handleChange, handleSubmit, values, errors} = useFormik<LoginUser>({
    initialValues,
    validationSchema,
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <Login
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={values}
      serverError={error}
      errors={errors}
      loading={loading}
    />
  );
};

export default LoginScreen;
