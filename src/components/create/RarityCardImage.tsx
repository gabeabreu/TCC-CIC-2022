import { Rarity } from '@/redux/collection/types';
import Image from 'next/image';
import React from 'react';

interface Props {
  image: Rarity;
}

const rarityColors = [
  { value: 'Common', color: '#FFFFFF' },
  { value: 'Rare', color: '#C5F2A2' },
  { value: 'Super Rare', color: '#D8A2F2' },
  { value: 'Epic', color: '#F2A2A2' },
  { value: 'Legend', color: '#F2CDA2' },
];

const RarityCardImage = ({ image }: Props) => (
  <div className="flex flex-col items-center">
    <span
      style={{
        color: rarityColors.find((rarity) => rarity.value === image.rarity)?.color,
      }}
      className={`mb-3 font-semibold text-xl`}
    >
      {image.rarity}
    </span>

    <div className="flex flex-col p-4 justify-center items-center w-[13.4rem] h-[13.4rem] lg:w-[13.4rem] lg:h-[13.4rem] xl:w-[19rem] xl:h-[19rem] 2xl:w-[23.2rem] 2xl:h-[23.2rem] rounded-xl border-2 border-dashed bg-mds-gray-500 border-mds-gray-200 duration-500">
      {image.src ? (
        <div className="relative flex w-full h-full rounded-lg overflow-hidden">
          <Image alt={image.rarity} src={image.src} layout="fill" />
        </div>
      ) : (
        <i className="fa-solid fa-image text-mds-gray-200 text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl duration-500" />
      )}
    </div>
  </div>
);

export default RarityCardImage;
