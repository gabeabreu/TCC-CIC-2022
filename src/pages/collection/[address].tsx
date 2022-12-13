import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { setCollectionData } from '@/redux/collection/actions';
import { useSelector } from '@/redux/hooks';
import DataSection from '@/components/collection/DataSection';
import ItemsSection from '@/components/collection/ItemsSection';

const Collection: NextPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { address } = router.query;

  const { collection } = useSelector((state) => state);

  const [isLoading, setLoading] = useState(false);

  async function getCollection() {
    const { data: collectionMetadata }: AxiosResponse = await axios.get(
      '/api/alchemy/getCollectionMetadata',
      {
        params: {
          address,
        },
      }
    );

    const { data: collectionBackEnd }: AxiosResponse = await axios.get('/api/collection/specific', {
      params: {
        address,
      },
    });

    const { data: nftsArray }: AxiosResponse = await axios.get('/api/alchemy/getCollectionNFTs', {
      params: {
        address,
      },
    });

    dispatch(
      setCollectionData({
        contract: {
          ...collectionMetadata,
          image: collectionBackEnd.imageUrl,
          ownerName: collectionBackEnd.userOwnerName,
          ownerAddress: collectionBackEnd.userOwnerAddress,
        },
        nfts: nftsArray.nfts,
      })
    );

    setLoading(false);
  }

  useEffect(() => {
    if (address && !isLoading) {
      setLoading(true);
      getCollection();
      //0xe6f6f753bf16f0f9d86c720dba320aa7cc25a7db
      //0xa0E20f7bB7d9cF5A796974d5DfF28c64E531EC39
    }
  }, [address]);

  return (
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>{collection?.collection?.data?.contract?.name || 'Collection - Midas'}</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="mb-32">
          <DataSection />
          <ItemsSection />
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

export default Collection;
