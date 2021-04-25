import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { storeFamepayFactoryThunk } from '../redux/actions/famepayFactory';
import styles from '../styles/Home.module.css';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeFamepayFactoryThunk());
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>TBD Homepage</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
