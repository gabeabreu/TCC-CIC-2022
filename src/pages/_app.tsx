/* eslint-disable @next/next/no-css-tags */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { makeStore, wrapper } from '../redux/store';
import { createClient, WagmiConfig, allChains, Chain, configureChains } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const ETHEREUM_MAINNET = 1;
const BINANCE_MAINNET = 56;
const POLYGON_MAINNET = 137;

const rpcUrl: any = {
  1: 'https://eth-mainnet-public.unifra.io/',
  56: 'https://bsc-dataseed.binance.org/',
  137: 'https://polygon-rpc.com/',
};

const ethereumMainnet = allChains.filter((chain) => chain.id === ETHEREUM_MAINNET);
const polygonMainnet = allChains.filter((chain) => chain.id === POLYGON_MAINNET);
const binanceMainnet: Chain = {
  network: 'binance',
  id: BINANCE_MAINNET,
  name: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org',
    default2: 'https://bsc-dataseed1.defibit.io/',
    default3: 'https://bsc-dataseed1.ninicoin.io/',
  },
  blockExplorers: {
    etherscan: {
      name: 'BNB Smart Chain Explorer',
      url: 'https://bscscan.com',
    },
    default: {
      name: 'BNB Smart Chain Explorer',
      url: 'https://bscscan.com',
    },
  },
};

const { chains, provider } = configureChains(
  [...polygonMainnet, binanceMainnet, ...ethereumMainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: rpcUrl[chain.id],
      }),
    }),
    publicProvider(),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  connectors() {
    return [
      new MetaMaskConnector({
        chains,
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'stackos',
        },
      }),
    ];
  },
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
