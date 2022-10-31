import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import ExploreSection from '../components/home/ExploreSection';
import HeroSection from '../components/home/HeroSection';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute z-0 bg-cover flex w-full h-[53.37rem] bg-[url('/assets/hero-background.svg')]"></div>
      <span className="absolute z-10 top-[53.37rem] w-full bg-gradient-to-r from-[#8F33E7] to-[#5A0068] h-[0.25rem]"></span>

      <Layout>
        <HeroSection />
        <ExploreSection />
      </Layout>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default Home;
