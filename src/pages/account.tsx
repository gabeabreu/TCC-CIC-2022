import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import TrendindSection from '../components/explore/TrendingSection';
import VerifiedSection from '../components/explore/VerifiedSection';
import NotableSection from '../components/explore/NotableSection';
import ProfileSection from '../components/account/ProfileSection';
import UserOptionsSection from '../components/account/UserOptionsSection';

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
        <title>Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="mb-96">
          <ProfileSection />
          <div className="h-[2px] w-full bg-[#303030] mt-24 mb-20" />
          <UserOptionsSection />
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