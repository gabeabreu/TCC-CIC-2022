import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Input from '../Input';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full absolute bg-mds-gray-500 bottom-0 z-50">
      <div className="h-1 w-full bg-gradient-to-r from-[#F71EFB] to-[#84ECFF] via-[#DF6EE2] " />
      <footer className="flex mx-auto max-w-[18.75rem] sm:max-w-[25.75rem] md:max-w-[37.375rem] md:px-0 lg:max-w-[53.375rem] xl:max-w-[70rem] 2xl:max-w-[85.5rem] justify-between py-8 duration-500">
        <div className="flex flex-col">
          <span className="text-[2.5rem] font-extrabold text-mds-white">MIDAS</span>
          <span className="text-mds-white text-xl">Join the community</span>
          <div className="flex gap-x-6 mt-1">
            <i className="fa-brands fa-discord text-mds-white text-2xl" />
            <i className="fa-brands fa-twitter text-mds-white text-2xl" />
            <i className="fa-brands fa-instagram text-mds-white text-2xl" />
          </div>
        </div>
        <div className="flex gap-x-28">
          <div className="flex flex-col">
            <span className="text-mds-white text-2xl font-semibold">Explore</span>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-mds-white text-2xl font-semibold">Mint</span>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-mds-white text-2xl font-semibold">About</span>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-circle text-mds-white text-[0.4rem]" />
              <span className="text-mds-white text-xl">Lorem</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
