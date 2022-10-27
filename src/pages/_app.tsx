/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { makeStore, wrapper } from '../redux/store';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link href="/assets/fontawesome/css/fontawesome.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/brands.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/duotone.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/light.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/regular.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/sharp-solid.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/solid.css" rel="stylesheet" />
        <link href="/assets/fontawesome/css/thin.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp));

// @ts-ignore
if (typeof window !== 'undefined' && window.Cypress) {
  // @ts-ignore
  window.store = makeStore();
}
