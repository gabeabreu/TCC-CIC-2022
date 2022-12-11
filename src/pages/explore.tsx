import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import TrendindSection from '../components/explore/TrendingSection';
import VerifiedSection from '../components/explore/VerifiedSection';
import NotableSection from '../components/explore/NotableSection';

const Home: NextPage = () => {
  const [offsetY, setOffsetY] = useState(0);

  function handleChangeOffset() {
    setOffsetY(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleChangeOffset);

    return () => {
      window.removeEventListener('scroll', handleChangeOffset);
    };
  }, []);

  return (
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>Explore - Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] mb-32 z-10 duration-500">
          <TrendindSection />
          <VerifiedSection />
          <NotableSection />
        </div>
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
