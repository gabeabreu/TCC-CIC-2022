import Image from 'next/image';
import { useState } from 'react';
import verifiedUsers from '../../../public/mock/nfts.json';
import Button from '../Button';
import SmallCard from '../Carousel/SmallCard';

const UserTabsSection = () => {
  return (
    <div className="relative flex flex-col justify-center mt-32 ml-56 pr-48">
      <div className="flex flex-row gap-x-10">
        <div className="flex items-center justify-center gap-x-2 relative text-mds-purple">
          <i className="fa-cards-blank fa-solid" />
          <span className="text-xl">Collections</span>
          <div className="absolute h-1 flex w-[10rem] -bottom-1 bg-mds-purple" />
        </div>
      </div>
      <div className="h-1 bg-mds-gray-300 w-full" />
      <div className="mt-12">
        {/* card de colecao */}
        <div className="flex">
          {/* left side */}
          <div className="flex flex-col items-start bg-mds-white rounded-l-lg max-w-sm py-12 pl-12 pr-9">
            <div className="flex flex-col">
              <div className="w-full flex justify-center mb-7">
                <div className="w-[19rem] h-[12rem] relative rounded-full">
                  <Image
                    src="/mockImages/nike.svg"
                    layout="fill"
                    alt="collection logo"
                    objectFit="cover"
                  />
                </div>
              </div>
              <span className="font-semibold text-2xl text-mds-gray-500 mb-1">Nome coleção</span>
              <span className="text-mds-gray-500 overflow-hidden overflow-ellipsis max-w-[19rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eos in quo culpa.
                Facilis, laborum aut. Natus ab perspiciatis minima, dolores aut explicabo sint
                aspernatur sed? Placeat quibusdam velit quidem!
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-mds-gray-200 text-xs font-semibold">{`Available: ${20}`}</span>
              <span className="text-mds-gray-200 text-xs font-semibold">{`Redeemed: ${20}`}</span>
            </div>
          </div>
          {/* right side */}
          <div className="items-end flex flex-col gap-y-10 py-12 pr-12 pl-9">
            <div className="flex gap-x-8">
              {verifiedUsers.slice(0, 3).map((item, idx) => (
                <SmallCard
                  key={idx}
                  description={item.description}
                  idNumber={item.idNumber}
                  pictureUrl={item.pictureUrl}
                  title={item.title}
                />
              ))}
            </div>
            <Button className="bg-mds-purple rounded-lg">View more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTabsSection;
