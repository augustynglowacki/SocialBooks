import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {DetailsScreenRouteProp, LoginScreenProp, Route} from 'src/constants';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Review} from 'src/models';
import {setErrorNull, userSelector} from 'src/redux/user/userSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {AddReview} from 'src/components/forms/AddReview';
import {setReviews} from 'src/redux/collections/collectionsActions';

interface Props {
  route: DetailsScreenRouteProp;
}

export const AddReviewScreen: React.FC<Props> = ({route}) => {
  const {book} = route.params;
  if (!book) return null;

  const initialValues: Review = {
    book,
    createdDate: new Date().toISOString(),
    id: new Date().toISOString() + book.id,
    rating: 0,
    reviewTitle: '',
    reviewDescription: '',
    comments: [''],
    likes: 0,
  };
  const {t} = useTranslation('form');
  const {error, loading} = useSelector(userSelector);
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation<LoginScreenProp>();

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

  const handleAdReview = (review: Review) => {
    dispatch(setReviews(review));
  };

  const onSubmit = () => {
    handleAdReview(values);
    goBack();
  };

  const validationSchema = Yup.object({
    rating: Yup.number().required(t('required')),
    reviewTitle: Yup.string()
      .min(6, t('reviewShort', {length: 6}))
      .max(24, t('reviewLong', {length: 24}))
      .required(t('required')),
    reviewDescription: Yup.string().max(1000, t('reviewLong', {length: 1000})),
  });

  const {handleChange, handleSubmit, values, errors} = useFormik<Review>({
    initialValues,
    validationSchema,
    //validate only after submit click
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <AddReview
      onSubmit={handleSubmit}
      onChange={handleChange}
      form={values}
      serverError={error}
      errors={errors}
      loading={loading}
      book={book}
    />
  );
};
