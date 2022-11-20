/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { makeStore, wrapper } from '../redux/store';
import Head from 'next/head';
import { configureChains, chain, defaultChains, WagmiConfig, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.goerli],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

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
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp));

// @ts-ignore
if (typeof window !== 'undefined' && window.Cypress) {
  // @ts-ignore
  window.store = makeStore();
}
