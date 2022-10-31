import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Input from '../Input';

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {router?.pathname !== '/' ? (
        <div>
          <header className="flex items-center px-24 py-8 justify-between bg-black w-full">
            <span className="font-extrabold text-[2.5rem] text-mds-white">MIDAS</span>
            <div className="flex items-center">
              <Link passHref href="/">
                <a className="text-xl text-mds-white mr-5">Explore</a>
              </Link>
              <Link passHref href="/">
                <a className="text-xl text-mds-white mr-4">Create</a>
              </Link>
              <Input
                placeholder="Search items, collections or accounts"
                className="rounded-full bg-mds-white w-[22.6rem]"
                icon={<i className="fa-solid fa-magnifying-glass text-[#c5c5c5]" />}
              />
              <div className="relative ml-3 h-[2.5rem] w-[2.5rem] rounded-full cursor-pointer">
                <Link passHref href="/">
                  <Image src="/assets/user-avatar-white.svg" alt="user-avatar" layout="fill" />
                </Link>
              </div>
            </div>
          </header>
          <div className="h-1 w-full bg-gradient-to-r from-[#8D32E6] to-[#5A0068] via-[#7319A7] " />
        </div>
      ) : (
        <header className="flex px-24 mt-11 items-center justify-between">
          <span className="font-extrabold text-4xl text-mds-white">MIDAS</span>
          <div className="flex items-center">
            <Input
              placeholder="Search items, collections or accounts"
              className="rounded-full bg-mds-white w-[22.6rem]"
              icon={<i className="fa-solid fa-magnifying-glass text-[#c5c5c5]" />}
            />
            <div className="relative ml-3 h-[3.5rem] w-[3.5rem] rounded-full cursor-pointer">
              <Image src="/assets/user-avatar.svg" alt="user-avatar" layout="fill" />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
