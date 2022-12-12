import Image from 'next/image';
import { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAccount } from 'wagmi';
import { useSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { setUserData } from '@/redux/user/actions';
import Modal from '../../Modal';
import { Form, Formik } from 'formik';
import InputFormik from '../../InputFormik';
import formSchema from './formSchema';
import Button from '@/components/Button';

const AnotheProfileSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const { status, address: wagmiAddress } = useAccount();

  const [formattedAddress, setFormattedAddress] = useState<string>();
  const [isCopied, setIsCopied] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { address } = router.query;

  const handleCopyText = () => {
    navigator.clipboard.writeText(String(address) || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  async function fetchUser() {
    const user = await fetch(
      `/api/users/login?` +
        new URLSearchParams({
          address: String(address),
        })
    ).then((res) => res.json());
    setUserData(user);
    return user;
  }

  useEffect(() => {
    if (address === wagmiAddress) {
      router.push('/account');
    }
    if (address) {
      fetchUser();
      setFormattedAddress(
        `${String(address)?.substring(0, 5)}...${String(address)?.substring(
          String(address).length - 6,
          String(address).length
        )}`
      );
    }
  }, [String(address)]);

  return (
    <>
      <div className="relative flex flex-col w-full">
        <div className="bg-mds-black overflow-hidden relative w-screen h-[25rem]">
          <Image
            src={
              address
                ? userData?.bannerPictureUrl || '/assets/accountPage/banner.svg'
                : '/assets/accountPage/banner.svg'
            }
            layout="fill"
            objectFit="cover"
            alt="Background image"
          />
        </div>
        <div className="h-1 w-screen overflow-hidden bg-gradient-to-r from-[#8D32E6] to-[#5A0068] via-[#7319A7] " />
        <div className="flex flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] z-10 duration-500">
          <div className="absolute top-[14.8rem] shadow-xl">
            <div className="bg-mds-gray-500 overflow-hidden relative w-52 h-52 rounded-3xl border-[0.5rem] border-mds-gray-300">
              <Image
                src={
                  address
                    ? userData?.profilePictureUrl || '/assets/accountPage/profilePicture.svg'
                    : '/assets/accountPage/profilePicture.svg'
                }
                layout="fill"
                objectFit="cover"
                alt="Background image"
              />
            </div>
          </div>
          <div className="flex mt-20 justify-between ">
            <div>
              <div className="flex items-center gap-x-3">
                <span className="font-semibold text-4xl text-mds-white">
                  {userData?.name ? userData?.name : 'Unnamed'}
                </span>
                {userData && userData?.isVerified && (
                  <div className="relative -mb-1">
                    <i className="fa-solid fa-certificate text-mds-purple text-3xl" />
                    <i className="fa-solid fa-check text-mds-black text-xl absolute left-[0.33rem] top-[0.28rem]" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-x-5 items-center">
              <a
                target="blank"
                href={
                  address ? userData?.discord || 'https://discord.com/' : 'https://discord.com/'
                }
              >
                <i className="fa-brands fa-discord text-mds-white text-2xl cursor-pointer" />
              </a>
              <a
                target="blank"
                href={
                  address
                    ? userData?.website || 'https://www.google.com.br/'
                    : 'https://www.google.com.br/'
                }
              >
                <i className="fa-sharp fa-solid fa-globe text-mds-white text-2xl cursor-pointer" />
              </a>
              <a
                target="blank"
                href={
                  address
                    ? userData?.twitter || 'https://twitter.com/home'
                    : 'https://twitter.com/home'
                }
              >
                <i className="fa-brands fa-twitter text-mds-white text-2xl cursor-pointer" />
              </a>
              <a
                target="blank"
                href={
                  address
                    ? userData?.instagram || 'https://www.instagram.com/'
                    : 'https://www.instagram.com/'
                }
              >
                <i className="fa-brands fa-instagram text-mds-white text-2xl cursor-pointer" />
              </a>
            </div>
          </div>
          {userData && (
            <div className="flex items-center gap-x-2">
              <span
                className={`font-semibold text-xl mt-1 duration-300 ${
                  isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
                }`}
              >
                {formattedAddress}
              </span>
              <i
                onClick={() => handleCopyText()}
                className={`fa-solid fa-copy text-lg cursor-pointer duration-300 ${
                  isCopied ? 'text-mds-purple' : 'text-mds-gray-100'
                }`}
              />
            </div>
          )}
          {userData?.bio && (
            <p className="font-medium text-lg text-mds-gray-200 max-w-full mt-4">{userData?.bio}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AnotheProfileSection;
