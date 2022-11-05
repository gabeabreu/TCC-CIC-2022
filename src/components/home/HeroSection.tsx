import { Trans, useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from '../Button';

const HeroSection = ({ offsetY }: { offsetY: number }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full h-[53.37rem] relative">
      <div className="flex flex-col">
        <span className="w-[41.37rem] mt-[12rem] text-5xl font-extrabold text-mds-white p:inline p:text-mds-cyan">
          <Trans>{t('HERO_SECTION_TITLE')}</Trans>
        </span>
        <span className="w-[35rem] mt-5 text-2xl font-normal text-mds-white">
          {t('HERO_SECTION_DESCRIPTION')}
        </span>
        <div className="flex mt-9 gap-x-6">
          <Link passHref href="/explore">
            <Button className="button-gradient px-14 font-semibold duration-500">
              {t('EXPLORE')}
            </Button>
          </Link>
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
