import React from 'react';
import {Home} from 'src/components/Home';
import {useGetBookQuery} from 'src/services/books';

export const HomeScreen: React.FC = () => {
  const {data, isLoading, isError, error, refetch} = useGetBookQuery();

  return <Home book={data} isLoading={isLoading} isError={isError} error={error} refetch={refetch} />;
};
