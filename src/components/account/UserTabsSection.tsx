import Image from 'next/image';
import { useState } from 'react';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import SmallCard from '../Carousel/SmallCard';
import CollectionCard from './CollectionCard';

const UserTabsSection = () => {
  return (
    <div className="relative flex flex-col justify-center mt-32 ml-80 pr-80">
      <div className="flex flex-row gap-x-10">
        <div className="flex items-center justify-center gap-x-2 relative text-mds-purple">
          <i className="fa-cards-blank fa-solid" />
          <span className="text-xl">Collections</span>
          <div className="absolute h-1 flex w-[10rem] -bottom-1 bg-mds-purple" />
        </div>
      </div>
      <div className="h-1 bg-mds-gray-300 w-full" />
      <div className="mt-12">
        <CollectionCard />
      </div>
    </div>
  );
};

export default UserTabsSection;
