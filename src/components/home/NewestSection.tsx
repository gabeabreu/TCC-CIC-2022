import Image from 'next/image';
import React from 'react';
import Carousel from '../Carousel';
import nfts from '../../../public/mock/nfts.json';

const MaybeLikeSection = ({ offsetY }: { offsetY: number }) => {
  return (
    <div className="flex flex-col w-full mt-36 mb-40 relative">
      <div className="z-20 flex flex-col">
        <span className="font-extrabold text-[4rem] mb-8 text-mds-white">Trending products</span>
        {/* Simulando o espaço ocupado pelo carrossel  */}
        <Carousel data={nfts} isSmall />
      </div>
      <div
        style={{ transform: `translate(-${offsetY * 0.03}px, -${offsetY * 0.007}px)` }}
        className="selectDisable absolute w-[14.625rem] h-[14.625rem] top-[26rem] right-[59rem] duration-100"
      >
        <Image
          src="/assets/landingPage/bg-trending1.svg"
          alt="just aesthetical image"
          layout="fill"
          priority
        />
      </div>
      <div
        style={{ transform: `translate(-${offsetY * 0.02}px, -${offsetY * 0.01}px)` }}
        className="selectDisable absolute w-[14.625rem] h-[14.625rem] top-[4rem] right-[43rem] duration-100"
      >
        <Image
          src="/assets/landingPage/bg-trending2.svg"
          alt="just aesthetical image"
          layout="fill"
          priority
        />
      </div>
      <div
        style={{ transform: `translate(-${offsetY * 0.01}px, ${offsetY * 0.03}px)` }}
        className="selectDisable absolute w-[18.5rem] h-[18.5rem] top-[14rem] right-[15rem] duration-100"
      >
        <Image
          src="/assets/landingPage/bg-trending3.svg"
          alt="just aesthetical image"
          layout="fill"
          priority
        />
      </div>
      <div
        style={{ transform: `translate(-${offsetY * 0.005}px, -${offsetY * 0.02}px)` }}
        className="selectDisable absolute w-[4.625rem] h-[4.625rem] top-[8.8rem] right-[-4rem] duration-100"
      >
        <Image
          src="/assets/landingPage/bg-trending4.svg"
          alt="just aesthetical image"
          layout="fill"
          priority
        />
      </div>
    </div>
  );
};

export default MaybeLikeSection;
