import { useSelector } from '@/redux/hooks';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import SmallCard from '../Carousel/SmallCard';
import EmptyState from '../EmptyState';
import Tabs from '../Tabs';
import CollectionCard from './CollectionCard';

const UserTabsSection = () => {
  const router = useRouter();
  const { tab } = router.query;

  const { address: routerAddress } = router.query;
  const { address: wagmiAddress } = useAccount();

  const [address, setAddress] = useState('');

  const [userData, setUserData] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const [redeemedTokens, setRedeemedTokens] = useState<any>([]);
  const [userCollections, setUserCollections] = useState<any>([]);
  const [tabs, setTabs] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('');

  async function fetchUser() {
    const user = await fetch(
      `/api/users/login?` +
        new URLSearchParams({
          address: String(address),
        })
    ).then((res) => res.json());
    setUserData(user);
  }

  async function getRedeemedItems() {
    const { data: collections }: AxiosResponse = await axios.get('/api/collection/all');
    const contractFilter = collections.map((collection: any) => collection.address);

    if (contractFilter.length) {
      console.log('entrou');
      const { data: nftsArray }: AxiosResponse = await axios.get('/api/alchemy/getNftsFromOwner', {
        params: {
          address,
          contractFilter: contractFilter.toString(),
        },
      });

      setRedeemedTokens(nftsArray.ownedNfts);
      setLoading(false);
    }
  }

  async function getCollections() {
    const { data: collections }: AxiosResponse = await axios.get('/api/collection/all');
    const contractFilter = collections.map((collection: any) => collection.address.toLowerCase());

    console.log(contractFilter);
    if (contractFilter.length) {
      const { data: collectionsArray }: AxiosResponse = await axios.get(
        '/api/alchemy/getContractsFromOwner',
        {
          params: {
            address,
            contractFilter: contractFilter.toString(),
          },
        }
      );

      const { data: collectionsBackEnd }: AxiosResponse = await axios.get(
        '/api/collection/specific',
        {
          params: {
            address: collectionsArray[0].address,
          },
        }
      );

      console.log(collectionsArray);
      console.log(collectionsBackEnd);

      setUserCollections(collectionsArray);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (routerAddress) {
      setAddress(String(routerAddress));
    } else setAddress(String(wagmiAddress));
  }, [wagmiAddress, router]);

  useEffect(() => {
    if (address) {
      fetchUser();
    }
  }, [address]);

  useEffect(() => {
    if (userData) {
      if (userData?.isVerified) {
        getCollections();
        setCurrentTab(String(tab) != 'Details' ? 'Collections' : String(tab));
        setTabs([
          { icon: 'fa-cards-blank', src: '#', label: 'Collections' },
          { icon: 'fa-memo-circle-info', src: '#', label: 'Details' },
        ]);
      } else {
        getRedeemedItems();
        setCurrentTab(String(tab) != 'Details' ? 'Redeemed' : String(tab));
        setTabs([
          { icon: 'fa-cards-blank', src: '#', label: 'Redeemed' },
          { icon: 'fa-memo-circle-info', src: '#', label: 'Details' },
        ]);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (tab) setCurrentTab(String(tab));
  }, [router.query]);
  // console.log(userCollections);
  return (
    <div className="flex mt-10 relative flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] z-10 duration-500">
      {currentTab && (
        <>
          <Tabs
            onChange={(value) =>
              router.push({
                pathname: routerAddress ? `/account/${address}` : '/account',
                query: {
                  tab: value,
                },
              })
            }
            current={currentTab}
            data={tabs}
          />

          <div className="flex items-center w-full rounded-lg overflow-hidden mt-7">
            <div className="bg-mds-gray-200 px-5 gap-x-3 py-3 flex items-center whitespace-nowrap">
              <span className="font-medium text-white">Sort by</span>
              <i className="fa-solid fa-chevron-down text-white" />
            </div>
            <div className="h-full w-full bg-white">
              <input
                className="h-full w-full py-3 px-4 text-lg"
                type="text"
                placeholder="Search by collection name"
              />
            </div>
            <div className="bg-mds-purple flex justify-center items-center h-full rounded-r-lg overflow-hidden py-[0.56rem] mb-[0.02rem] px-8">
              <i className="fa-solid fa-magnifying-glass text-white text-lg" />
            </div>
          </div>
          <div>
            {currentTab === 'Redeemed' && (
              <div className="mt-12 flex gap-x-[15rem] xl:gap-x-[6.5rem] 2xl:gap-x-[2.9rem] gap-y-10 flex-wrap duration-500">
                {!redeemedTokens.length ? (
                  <EmptyState
                    onClickLink={() => router.push('redeem')}
                    title={
                      routerAddress ? "This user don't have tokens" : 'You don’t have tokens yet'
                    }
                    showLink={routerAddress === ''}
                    link="Redeem token"
                  />
                ) : (
                  redeemedTokens?.map((nft: any) => (
                    <SmallCard
                      key={nft.tokenId}
                      idNumber={nft.tokenId}
                      description={nft.description || ''}
                      title={nft.title || ''}
                      pictureUrl={
                        nft.media?.[0]?.gateway || '/assets/accountPage/profilePicture.svg'
                      }
                    />
                  ))
                )}
              </div>
            )}
            {currentTab === 'Collections' && (
              <div className="mt-12 flex flex-col duration-500">
                {!userCollections.length ? (
                  <EmptyState
                    onClickLink={() => router.push('create')}
                    title="You don’t have collections yet."
                    link="Create collection"
                  />
                ) : (
                  <div className="flex flex-col gap-y-10">
                    {userCollections?.map((collection: any) => (
                      <CollectionCard
                        key={collection.address}
                        address={collection.address}
                        name={collection.name}
                        description={collection.description}
                        totalSupply={Number(collection.totalBalance)}
                        totalRedeemed={Number(collection.totalSupply) - collection.totalBalance}
                        // nfts={[]}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            {currentTab === 'Details' && (
              <div className="bg-mds-gray-300 mt-12 rounded-xl p-10 flex flex-col duration-500">
                <span>Details</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTabsSection;
