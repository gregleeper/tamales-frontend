// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';

import Header from '../components/Header';
import { CartStateProvider } from '../lib/cartState';
import { prodEndpoint } from '../config';

const link = createHttpLink({
  uri: prodEndpoint,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CartStateProvider>
        <Header />
        <Component {...pageProps} />{' '}
      </CartStateProvider>
    </ApolloProvider>
  );
}

export default MyApp;
