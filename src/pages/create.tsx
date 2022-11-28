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
import CreateSection from '@/components/create/CreateSection';

const Home: NextPage = () => {
  return (
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>Create - Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <CreateSection />
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
