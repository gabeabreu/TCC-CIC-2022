import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import TrendindSection from '../components/explore/TrendingSection';
import VerifiedSection from '../components/explore/VerifiedSection';
import NotableSection from '../components/explore/NotableSection';
import ProfileSection from '../components/account/ProfileSection/ProfileSection.tsx/ProfileSection';
import UserOptionsSection from '../components/account/UserTabsSection';
import CreateSection from '@/components/create/CreateSection/CreateSection';

const Home: NextPage = () => {
  return (
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>Create - Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] z-10 duration-500">
          <CreateSection />
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
