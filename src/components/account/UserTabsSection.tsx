import { useSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import SmallCard from '../Carousel/SmallCard';
import Tabs from '../Tabs';
import CollectionCard from './CollectionCard';

const UserTabsSection = () => {
  const router = useRouter();
  const { tab } = router.query;

  const { user } = useSelector((state) => state);

  const [tabs, setTabs] = useState<any[]>([]);
  const [currentTab, setTab] = useState(
    tab ? String(tab) : user.data.isVerified ? 'Collections' : 'Items'
  );

  useEffect(() => {
    if (tab) setTab(String(tab));
  }, [router]);

  useEffect(() => {
    if (user.data.isVerified) {
      setTabs([
        { icon: 'fa-cards-blank', src: '#', label: 'Collections' },
        { icon: 'fa-memo-circle-info', src: '#', label: 'Details' },
      ]);
    } else {
      setTabs([
        { icon: 'fa-cards-blank', src: '#', label: 'Items' },
        { icon: 'fa-memo-circle-info', src: '#', label: 'Details' },
      ]);
    }
  }, []);

  return (
    <div className="flex mt-10 relative flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] z-10 duration-500">
      <Tabs
        onChange={(value) =>
          router.push({
            query: {
              tab: value,
            },
          })
        }
        current={currentTab}
        data={tabs}
      />

      <div className="flex items-center w-full rounded-lg overflow-hidden mt-7">
        <div className="bg-mds-gray-200 px-5 gap-x-3 py-4 flex items-center h-full whitespace-nowrap">
          <span className="font-medium text-white">Sort by</span>
          <i className="fa-solid fa-chevron-down text-white" />
        </div>
        <div className="h-full w-full bg-white">
          <input
            className="h-full w-full p-4 text-lg"
            type="text"
            placeholder="Search by collection name"
          />
        </div>
        <div className="bg-mds-purple flex justify-center items-center h-full rounded-r-lg overflow-hidden py-[0.82rem] mb-[0.1rem] px-5">
          <i className="fa-solid fa-magnifying-glass text-white text-lg" />
        </div>
      </div>
      <div className="mt-12 gap-y-20 flex flex-col">
        <CollectionCard />
        <CollectionCard />
      </div>
    </div>
  );
};

export default UserTabsSection;
