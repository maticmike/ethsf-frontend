import React from 'react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import store from '../redux/store';
// import { ApolloProvider } from '@apollo/client';
// import { useApollo } from '../apollo/apolloClient';
import { Container } from '@material-ui/core';

import '../styles/globals.css';

import Navbar from '../components/navbar';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
};

export default MyApp;
