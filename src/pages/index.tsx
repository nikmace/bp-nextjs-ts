import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { mutate } = trpc.useMutation(['some.mutation-here']);

  return (
    <div className="text-3xl header">
      <h1>Hello from NextJS</h1>
    </div>
  );
};

export default Home;
