import Image from 'next/image';
import { useEffect, useState } from 'react';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAccount } from 'wagmi';
import { useSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { setUserData } from '@/redux/user/actions';
import Modal from '../Modal';
import { Form, Formik } from 'formik';
import InputFormik from '../InputFormik';
import Button from '@/components/Button';
import { formatAddres } from '@/helpers/utils';

const DataSection = () => {
  const dispatch = useDispatch();
  const { collection } = useSelector((state) => state);
  const { collection: collectionData } = collection;

  const { address, status } = useAccount();
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const [isCopied, setIsCopied] = useState(false);
  const [isTrulyConnected, setIsTrulyConnected] = useState(false);
  const [percent, setPercent] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (address) {
      setIsTrulyConnected(true);
      setFormattedAddress(
        `${address?.substring(0, 5)}...${address?.substring(address.length - 6, address.length)}`
      );
    } else {
      setIsTrulyConnected(false);
    }
  }, [address]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(address || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <>
      <div className="relative flex flex-col w-full">
        <div className="overflow-hidden relative w-screen h-[25rem]">
          <Image
            src={'/assets/collectionPage/banner.svg'}
            layout="fill"
            objectFit="cover"
            alt="Background image"
          />
        </div>
        <div className="h-1 w-screen overflow-hidden bg-mds-gray-300" />
        <div className="flex relative flex-col mx-auto w-[18.75rem] sm:w-[25.75rem] md:w-[37.375rem] md:px-0 lg:w-[53.375rem] xl:w-[70rem] 2xl:w-[85rem] z-10 duration-500">
          <div className="absolute -top-[10.2rem] shadow-2xl">
            <div className="bg-mds-gray-500 overflow-hidden relative w-52 h-52 rounded-3xl border-[0.5rem] border-mds-gray-300">
              <Image
                src={
                  collectionData?.data?.contract?.image || '/assets/accountPage/profilePicture.svg'
                }
                layout="fill"
                objectFit="cover"
                alt="Background image"
              />
            </div>
          </div>
          <div className="flex absolute -top-[4.8rem] pl-[15rem] justify-between w-full">
            <div>
              <div className="flex items-end gap-x-4">
                <span className="font-semibold text-4xl text-mds-white">
                  {collectionData?.data?.contract?.name || 'Unnamed'}
                </span>
                <div className="mb-[0.4rem] w-[0.2rem] bg-[#3E3E3E] h-7 rounded-full" />
                <span className="flex gap-x-2 font-semibold text-2xl text-mds-gray-100 hover:text-mds-white items-end duration-500">
                  <a
                    className="cursor pointer"
                    href={`/account/${collectionData?.data?.contract?.ownerAddress}`}
                  >
                    {collectionData?.data?.contract?.ownerName || ''}
                  </a>
                  <i className="fa-solid fa-badge-check text-mds-purple text-lg mb-[0.2rem]" />
                </span>
              </div>
            </div>
            <div className="flex gap-x-5 items-center">
              <a target="blank" href={'#'}>
                <i className="fa-sharp fa-solid fa-globe text-mds-white text-2xl cursor-pointer" />
              </a>
              <a target="blank" href={'#'}>
                <i className="fa-brands fa-twitter text-mds-white text-2xl cursor-pointer" />
              </a>
              <i
                className="fa-solid fa-flag text-mds-white text-2xl cursor-pointer"
                onClick={() => setIsSettingsOpen(true)}
              />
            </div>
          </div>
          <p className="font-medium text-xl text-mds-gray-200 max-w-full mt-20">
            {`Welcome to the home of ${
              collectionData?.data?.contract?.name
            } on Midas. Discover the best items in this collection. This is a ERC721 token based collection, with total supply of ${
              collectionData?.data?.contract?.totalSupply
            }. The contract address is: ${formatAddres(collectionData?.data?.contract?.address)}.`}
          </p>
        </div>
      </div>
    </>
  );
};

export default DataSection;
