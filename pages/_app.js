import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Setlist Manager</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
