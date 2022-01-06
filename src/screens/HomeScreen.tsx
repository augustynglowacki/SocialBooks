import React from 'react';
import {useSelector} from 'react-redux';
import {Home} from 'src/components/Home';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {useGetBookQuery} from 'src/services/books';

export const HomeScreen: React.FC = () => {
  const {data, isLoading, isError, error, refetch} = useGetBookQuery();
  return <Home book={data} isLoading={isLoading} isError={isError} error={error} refetch={refetch} />;
};
