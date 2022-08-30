import { withTRPC } from '@trpc/next';
import type { AppProps } from 'next/app';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import superjson from 'superjson';
import { Toaster } from 'react-hot-toast';
// import dynamic from 'next/dynamic';

import { URL } from '../constants';
import { AppRouter } from '../server/route/app.router';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 4000,
          success: {
            style: {
              padding: '8px',
            },
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url: URL,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: false,
})(
  // dynamic(() => Promise.resolve(MyApp), {
  //   ssr: false,
  // })
  MyApp
);
