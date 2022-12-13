import Image from 'next/image';
import React from 'react';
import AboutCard from './AboutCard';

const AboutSection = ({ offsetY }: { offsetY: number }) => (
  <div className="flex flex-col mb-[52rem] mt-36 py-12 ml-24 pl-20 relative">
    <span className="font-extrabold text-[4.5rem] text-mds-white">About us</span>
    <p className="text-mds-white text-[2.8rem] font-semibold max-w-[60rem]">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </p>
    <div className="flex gap-x-36 w-full justify-center pr-24 mt-24">
      <AboutCard title="95+" text="Partner Companies" />
      <AboutCard title="$1Mi+" text="Market Value" />
    </div>
    <div
      style={{ transform: `translate(-${offsetY * 0.02}px, -${offsetY * 0.02}px)` }}
      className="selectDisable absolute w-[4.2rem] h-[4.2rem] top-[0rem] left-[-3rem] duration-200"
    >
      <Image
        src="/assets/landingPage/bg-about1.svg"
        alt="just aesthetical image"
        layout="fill"
        priority
      />
    </div>
    <div
      style={{ transform: `translate(${offsetY * 0.02}px, ${offsetY * 0.02}px)` }}
      className="selectDisable absolute w-[4.2rem] h-[4.2rem] bottom-[-4rem] right-[3rem] duration-200"
    >
      <Image
        src="/assets/landingPage/bg-about2.svg"
        alt="just aesthetical image"
        layout="fill"
        priority
      />
    </div>
  </div>
);

export default AboutSection;
