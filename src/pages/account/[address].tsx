import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import TrendindSection from '../../components/explore/TrendingSection';
import VerifiedSection from '../../components/explore/VerifiedSection';
import NotableSection from '../../components/explore/NotableSection';
import ProfileSection from '../../components/account/ProfileSection/ProfileSection';
import UserTabsSection from '@/components/account/UserTabsSection';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from '@/redux/hooks';

const Account: NextPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { address } = router.query;

  const { user } = useSelector((state) => state);

  const [isLoading, setLoading] = useState(false);

  async function getUser() {
    // Get another user data on db
    const { data: collectionMetadata }: AxiosResponse = await axios.get(
      '/api/alchemy/getCollectionMetadata',
      {
        params: {
          address,
        },
      }
    );

    const { data: nftsArray }: AxiosResponse = await axios.get('/api/alchemy/getCollectionNFTs', {
      params: {
        address,
      },
    });

    // dispatch(
    //   getUser({
    //     contract: { ...collectionMetadata },
    //     nfts: nftsArray.nfts,
    //   })
    // );
  }

  useEffect(() => {
    if (address && !isLoading) {
      // getUser();
    }
  }, [address]);

  return (
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>Profile - Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="mb-32">
          <ProfileSection />
          <UserTabsSection />
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default Account;
