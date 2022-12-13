/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import HeroSection from '../components/home/HeroSection';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import AboutSection from '../components/home/AboutUsSection';
import NewestSection from '@/components/home/NewestSection';
import Image from 'next/image';

const Home: NextPage = () => {
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
    <div className="flex w-full min-h-screen h-full bg-mds-gray-500 overflow-x-hidden">
      <Head>
        <title>Midas</title>
        <meta name="Midas" content="The highend products NFT platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute z-0 bg-cover flex w-full h-[53.37rem] bg-[url('/assets/hero-background.svg')]"></div>
      <span className="absolute z-10 top-[53.37rem] w-full bg-gradient-to-r from-[#8F33E7] to-[#5A0068] h-[0.25rem]"></span>

      <Layout>
        <div className="absolute flex bottom-[10rem] left-0 items-center w-screen">
          <div className="selectDisable overflow-hidden relative w-screen h-[230rem]">
            {/* <div className=" absolute w-full h-[4.2rem] bottom-[-4rem] right-[3rem] duration-200"> */}
            <Image
              src="/assets/landingPage/lastregion.svg"
              alt="just aesthetical image"
              layout="fill"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] mb-32 z-10 duration-500">
          <HeroSection offsetY={offsetY} />
          <NewestSection offsetY={offsetY} />
          <AboutSection offsetY={offsetY} />
        </div>
      </Layout>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
export default Home;
