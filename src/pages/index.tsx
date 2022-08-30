import type { NextPage } from 'next';
import { useEffect } from 'react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['some.query-here']);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-3xl header">
      <h1>Hello from NextJS</h1>
      <p>{data}</p>
    </div>
  );
};

export default Home;
