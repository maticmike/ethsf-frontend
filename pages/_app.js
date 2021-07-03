import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo';
import { Container } from '@material-ui/core';

import '../styles/globals.css';

const Navbar = dynamic(() => import('../components/navigation/navbar'), {
  loading: () => <p>Navbar Loading....</p>,
});

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Navbar />
        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;

// TODO: Apollo, Campaign Id -> on contract
