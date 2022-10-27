import { Trans, useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';

const HeroSection = () => {
  const { t } = useTranslation();
  const [offsetY, setOffsetY] = useState(0);

  function handleChangeOffset() {
    setOffsetY(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleChangeOffset);

    return () => {
      window.removeEventListener('scroll', handleChangeOffset);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-[53.37rem] relative">
      <header className="flex mt-11 items-center justify-between">
        <span className="font-extrabold text-4xl text-mds-white">MIDAS</span>
        <div className="flex items-center">
          <Input
            placeholder={t('SEARCH_INPUT_PLACEHOLDER')}
            className="rounded-full bg-mds-white w-[22.6rem]"
            icon={<i className="fa-solid fa-magnifying-glass text-[#c5c5c5]" />}
          />
          <div className="relative ml-3 h-[3.5rem] w-[3.5rem] rounded-full cursor-pointer">
            <Image src="/assets/user-avatar.svg" alt="user-avatar" layout="fill" />
          </div>
        </div>
      </header>
      <div className="flex flex-col">
        <span className="w-[41.37rem] mt-[12rem] text-5xl font-extrabold text-mds-white p:inline p:text-mds-cyan">
          <Trans>{t('HERO_SECTION_TITLE')}</Trans>
        </span>
        <span className="w-[35rem] mt-5 text-2xl font-normal text-mds-white">
          {t('HERO_SECTION_DESCRIPTION')}
        </span>
        <div className="flex mt-9 gap-x-6">
          <Button className="button-gradient px-14 font-semibold duration-500">
            {t('EXPLORE')}
          </Button>
          <Button className="font-semibold px-14" isOutline>
            {t('CREATE')}
          </Button>
        </div>
      </div>
      <div
        style={{ transform: `translate(-${offsetY * 0.025}px, -${offsetY * 0.025}px)` }}
        className="selectDisable absolute w-[70rem] h-[46.5rem] top-[3rem] left-[25rem] xl:w-[70rem] xl:h-[46.5rem] xl:top-[3rem] xl:left-[25rem] 2xl:w-[70rem] 2xl:h-[46.5rem] 2xl:top-[3rem] 2xl:left-[38em] duration-300"
      >
        <Image src="/assets/hero-cards.png" alt="hero-cards" layout="fill" />
      </div>
    </div>
  );
};

export default HeroSection;
