import React from 'react';
import {Home} from 'src/components/Home';
import {useGetPopularQuery} from 'src/services/books';

export const HomeScreen: React.FC = () => {
  const {data, isLoading, isError, error, refetch} = useGetPopularQuery();
  console.log(data, error);

  return <Home />;
};
