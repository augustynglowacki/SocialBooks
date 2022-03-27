import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {AddChallengeScreenProp, Route} from 'src/constants';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Challenge} from 'src/models';
import {setErrorNull, userSelector} from 'src/redux/user/userSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
// import {setChallenges} from 'src/redux/collections/collectionsActions';
import {AddChallenge} from 'src/components/forms/AddChallenge';

export const AddChallengeScreen: React.FC = () => {
  const initialValues: Challenge = {
    id: new Date().toISOString(),
    challengeDeadline: new Date().toISOString(),
    challengeTitle: '',
    challengeDescription: '',
    comments: [],
    takingPart: [],
    createdBy: '',
  };
  const {t} = useTranslation('form');
  const {error, loading} = useSelector(userSelector);
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation<AddChallengeScreenProp>();

  useFocusEffect(
    useCallback(() => {
      dispatch(setErrorNull());
    }, []),
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (!user) {
        //TODO change to start screen
        navigate(Route.HOME);
      }
    });
    return subscriber;
  }, [navigate]);

  const handleAddChallenge = (item: Challenge) => {
    // dispatch(setChallenges(item));
  };

  const onSubmit = () => {
    handleAddChallenge(values);
    goBack();
  };

  const validationSchema = Yup.object({
    rating: Yup.number().required(t('required')),
    reviewTitle: Yup.string()
      .min(3, t('reviewShort', {length: 3}))
      .max(24, t('reviewLong', {length: 24}))
      .required(t('required')),
    reviewDescription: Yup.string().max(1000, t('reviewLong', {length: 1000})),
  });

  const {handleChange, handleSubmit, values, errors, setFieldValue} = useFormik<Challenge>({
    initialValues,
    validationSchema,
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <AddChallenge
      onSubmit={handleSubmit}
      onChange={handleChange}
      setFieldValue={setFieldValue}
      form={values}
      serverError={error}
      errors={errors}
      loading={loading}
    />
  );
};
