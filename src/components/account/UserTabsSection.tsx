import Image from 'next/image';
import { useState } from 'react';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import SmallCard from '../Carousel/SmallCard';
import CollectionCard from './CollectionCard';

const UserTabsSection = () => {
  return (
    <div className="relative flex flex-col justify-center mt-16 ml-80 pr-80">
      <div className="flex flex-row gap-x-10">
        <div className="flex items-center justify-center gap-x-2 relative text-mds-purple">
          <i className="fa-cards-blank fa-solid" />
          <span className="text-xl">Collections</span>
          <div className="absolute h-1 flex w-[10rem] -bottom-1 bg-mds-purple" />
        </div>
      </div>
      <div className="h-1 bg-mds-gray-300 w-full" />
      {/* search bar */}
      <div className="flex items-center w-full rounded-lg overflow-hidden mt-10">
        <div className="bg-mds-gray-200 px-5 py-4 flex items-center h-full whitespace-nowrap">
          <span className="font-medium text-white">Sort by</span>
          <i className="fa-solid fa-chevron-down text-white" />
        </div>
        <div className="h-full w-full bg-white">
          <input
            className="h-full w-full py-4 text-lg"
            type="text"
            placeholder="Search by collection name"
          />
        </div>
        <div className="bg-mds-purple flex justify-center items-center h-full rounded-r-lg overflow-hidden py-3 px-5">
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
