import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {RegisterUser} from 'src/models';
import auth from '@react-native-firebase/auth';
import {createUserWithEmailAndPassword} from 'src/redux/user/userActions';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {Register} from 'src/components/forms/Register';
import * as Yup from 'yup';
import {RegisterScreenProp, Route} from 'src/constants';

const initialState = {username: '', email: '', password: ''};

export const RegisterScreen: React.FC = () => {
  const {error, loading} = useSelector(userSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<RegisterScreenProp>();
  const {t} = useTranslation('form');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigate(Route.HOME_NAVIGATOR);
      }
    });
    return subscriber;
  }, [navigate]);

  const handleCreateUser = ({email, password, username}: RegisterUser) => {
    dispatch(
      createUserWithEmailAndPassword({
        email,
        password,
        displayName: username,
      }),
    );
  };

  const onSubmit = () => {
    handleCreateUser(form);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t('required')),
    email: Yup.string().email(t('email')).required(t('required')),
    password: Yup.string()
      .min(6, t('short', {length: 6}))
      .required(t('required')),
  });

  const {
    handleChange,
    handleSubmit,
    values: form,
    errors,
  } = useFormik<RegisterUser>({
    initialValues: initialState,
    validationSchema,
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <Register
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={form}
      serverError={error}
      errors={errors}
      loading={loading}
    />
  );
};
