import Image from 'next/image';
import React from 'react';
import AboutCard from './AboutCard';

const AboutSection = ({ offsetY }: { offsetY: number }) => (
  <div className="flex flex-col mb-96 ml-24 relative">
    <span className="font-extrabold text-[5rem] text-mds-white">About us</span>
    <p className="text-mds-white text-[3.4rem] font-semibold max-w-[56.94rem]">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </p>
    <div className="flex gap-x-36 w-full justify-center mt-24">
      <AboutCard title="95+" text="Partner Companies" />
      <AboutCard title="$1Mi+" text="Market Value" />
    </div>
    <div
      style={{ transform: `translate(-${offsetY * 0.02}px, -${offsetY * 0.02}px)` }}
      className="selectDisable absolute w-[4.2rem] h-[4.2rem] top-[0rem] left-[-4rem] duration-200"
    >
      <Image
        src="/assets/landing/bg-about1.svg"
        alt="just aesthetical image"
        layout="fill"
        priority
      />
    </div>
    <div
      style={{ transform: `translate(${offsetY * 0.02}px, ${offsetY * 0.02}px)` }}
      className="selectDisable absolute w-[4.2rem] h-[4.2rem] bottom-[-4rem] right-[2rem] duration-200"
    >
      <Image
        src="/assets/landing/bg-about2.svg"
        alt="just aesthetical image"
        layout="fill"
        priority
      />
    </div>
  </div>
);

export default AboutSection;
