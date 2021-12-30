import React from 'react';
import {Home} from 'src/components/Home';
import {Book} from 'src/models';
import {useGetPopularQuery} from 'src/services/books';

export const HomeScreen: React.FC = () => {
  const {data, isLoading, isError, error, refetch} = useGetPopularQuery();
  // console.log(data, error);

  return <Home book={data} isLoading={isLoading} isError={isError} error={error} refetch={refetch} />;
};
